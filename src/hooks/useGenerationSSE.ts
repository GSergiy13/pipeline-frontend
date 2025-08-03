import { toastStyle } from 'constants/toast.const'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { generateT2VService } from 'services/generate.service'
import {
	generationSelectors,
	upsertGeneration,
	upsertManyGenerations
} from 'store/slices/generationDetailsSlice'
import { type ProgressStatus, upsertStatus } from 'store/slices/generationProgressSlice'
import type {
	AudioGenerationDetails,
	GenerationDetails,
	GenerationDetailsImgToImg
} from 'types/IVideo.type'
import { createSSEConnection } from 'utils/sseConnection'

type BaseGenerationItem = GenerationDetails | AudioGenerationDetails | GenerationDetailsImgToImg

interface SSEEvent {
	type: 'connected' | 'ping' | 'generation_completed' | 'generation_failed'
	generation?: BaseGenerationItem
	message?: string
}

export function useGenerationSSE(
	watchedIds: string[],
	isLoadingArray: { id: string; status: ProgressStatus }[]
): Record<string, BaseGenerationItem> {
	const [map, setMap] = useState<Record<string, BaseGenerationItem>>({})
	const dispatch = useDispatch()
	const existingGenerations = useSelector(generationSelectors.selectEntities)

	const activeIds = useRef<Set<string>>(new Set())
	const receivedIds = useRef<Set<string>>(new Set())
	const totalExpected = useRef(0)

	const sse = useRef(
		createSSEConnection({
			url: '/api/sse-connect',
			onMessage: ev => {
				try {
					const data: SSEEvent = JSON.parse(ev.data)
					if (data.type === 'ping') return
					if (data.type === 'generation_completed' || data.type === 'generation_failed') {
						const id = (data.generation as BaseGenerationItem)?._id
						if (!id || receivedIds.current.has(id)) return

						dispatch(
							upsertStatus({
								id,
								isLoading: false,
								isComplete: data.type === 'generation_completed'
							})
						)

						dispatch(upsertGeneration(data.generation!))
						setMap(prev => ({ ...prev, [id]: data.generation! }))
						receivedIds.current.add(id)
						if (receivedIds.current.size === totalExpected.current) sse.current.close()
					}
				} catch (err) {
					toast.error(`Помилка SSE: ${err}`, toastStyle)
				}
			},
			onError: () => toast.error('Не вдалося підʼєднатись до SSE', toastStyle)
		})
	)

	useEffect(() => {
		activeIds.current = new Set(watchedIds)
		receivedIds.current.clear()
		totalExpected.current = watchedIds.length

		const hasActiveLoading = watchedIds.some(id => {
			const status = isLoadingArray.find(s => s.id === id)
			return status?.status.isLoading === true
		})

		if (!hasActiveLoading) {
			sse.current.close()
		} else {
			sse.current.connect()
		}
	}, [watchedIds.join('|'), isLoadingArray])

	useEffect(() => {
		const initialMap: Record<string, BaseGenerationItem> = {}

		for (const id of watchedIds) {
			if (existingGenerations[id]) {
				initialMap[id] = existingGenerations[id] as BaseGenerationItem
			}
		}

		setMap(prev => ({ ...initialMap, ...prev }))
	}, [watchedIds.join('|'), existingGenerations])

	useEffect(() => {
		const missingIds = watchedIds.filter(id => {
			const exists = existingGenerations[id]
			const status = isLoadingArray.find(s => s.id === id)
			const isStillLoading = status?.status.isLoading && !status.status.isComplete

			return !exists && !isStillLoading
		})

		if (!missingIds.length) return
		;(async () => {
			const res = await Promise.all(
				missingIds.map(async id => {
					try {
						const { generation } = await generateT2VService.getGenerationInfo(id)
						return { id, generation: generation as BaseGenerationItem }
					} catch {
						return null
					}
				})
			)

			setMap(prev => {
				const updated = { ...prev }
				for (const r of res) if (r?.generation) updated[r.id] = r.generation
				return updated
			})

			const newGenerations = res.filter(r => r?.generation).map(r => r!.generation)
			if (newGenerations.length) dispatch(upsertManyGenerations(newGenerations))
		})()
	}, [existingGenerations, watchedIds])

	useEffect(() => () => sse.current.close(), [])

	return map
}
