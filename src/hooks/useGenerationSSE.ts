import { toastStyle } from 'constants/toast.const'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { generateT2VService } from 'services/generate.service'
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

	console.log('useGenerationSSE', watchedIds, isLoadingArray)

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

		if (totalExpected.current === 0) {
			sse.current.close()
		} else {
			sse.current.connect()
		}
	}, [watchedIds.join('|')])

	useEffect(() => {
		const allCompleted =
			watchedIds.length &&
			watchedIds.every(id => isLoadingArray.find(i => i.id === id)?.status.isComplete)

		if (allCompleted) {
			sse.current.close()
			;(async () => {
				const res = await Promise.all(
					watchedIds.map(async id => {
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
			})()
		}
	}, [isLoadingArray, watchedIds])

	useEffect(() => () => sse.current.close(), [])

	return map
}
