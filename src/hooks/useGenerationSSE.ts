import { toastStyle } from 'constants/toast.const'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { generateT2VService } from 'services/generate.service'
import { type VideoLoadingStatus, setVideoLoading } from 'store/slices/generationSlice'
import type {
	AudioGenerationDetails,
	GenerationDetails,
	GenerationDetailsImgToImg
} from 'types/IVideo.type'

type BaseGenerationItem = GenerationDetails | AudioGenerationDetails | GenerationDetailsImgToImg

interface SSEEvent {
	type: 'connected' | 'ping' | 'generation_completed' | 'generation_failed'
	generation?: BaseGenerationItem
	message?: string
}

const MAX_RETRIES = 3
const RETRY_INTERVAL = 3000

export function useGenerationSSE(
	watchedIds: string[],
	isLoadingArray: { id: string; status: VideoLoadingStatus }[]
): Record<string, BaseGenerationItem> {
	const [map, setMap] = useState<Record<string, BaseGenerationItem>>({})

	const dispatch = useDispatch()
	const eventSourceRef = useRef<EventSource | null>(null)
	const activeIdsRef = useRef<Set<string>>(new Set())
	const receivedIdsRef = useRef<Set<string>>(new Set())
	const totalExpectedRef = useRef(0)
	const isConnectedRef = useRef(false)
	const reconnectAttemptsRef = useRef(0)
	const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	const closeSSE = () => {
		eventSourceRef.current?.close()
		eventSourceRef.current = null
		isConnectedRef.current = false
		reconnectAttemptsRef.current = 0
		if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current)
	}

	const connectSSE = () => {
		if (isConnectedRef.current) return

		console.log('🔌 Відкриваю SSE зʼєднання')
		const es = new EventSource('/api/sse-connect')

		eventSourceRef.current = es
		isConnectedRef.current = true

		es.onopen = () => {
			console.log('✅ SSE зʼєднано')
			reconnectAttemptsRef.current = 0
		}

		es.onerror = e => {
			console.error('❌ SSE помилка зʼєднання', e)
			closeSSE()

			if (reconnectAttemptsRef.current < MAX_RETRIES) {
				reconnectAttemptsRef.current++
				reconnectTimeoutRef.current = setTimeout(connectSSE, RETRY_INTERVAL)
			} else {
				toast.error('Не вдалося підʼєднатись до SSE після 3 спроб', toastStyle)
			}
		}

		es.onmessage = ev => {
			try {
				const data: SSEEvent = JSON.parse(ev.data)
				if (data.type === 'ping') return

				if (data.type === 'generation_completed' || data.type === 'generation_failed') {
					const generationId = (data.generation as BaseGenerationItem)?._id
					if (!generationId) return
					if (receivedIdsRef.current.has(generationId)) return

					dispatch(
						setVideoLoading({
							videoId: generationId,
							isLoading: false,
							isComplete: data.type === 'generation_completed'
						})
					)

					setMap(prev => ({ ...prev, [generationId]: data.generation! }))

					receivedIdsRef.current.add(generationId)
					console.log(`📥 Отримано ${receivedIdsRef.current.size} з ${totalExpectedRef.current}`)

					if (receivedIdsRef.current.size === totalExpectedRef.current) {
						console.log('✅ Усі генерації завершені — закриваю SSE')
						closeSSE()
					}
				}
			} catch (err) {
				toast.error(`Помилка в SSE: ${err}`, toastStyle)
			}
		}
	}

	useEffect(() => {
		activeIdsRef.current = new Set(watchedIds)
		receivedIdsRef.current.clear()
		totalExpectedRef.current = watchedIds.length

		if (totalExpectedRef.current === 0) {
			if (isConnectedRef.current) closeSSE()
			return
		}

		if (!isConnectedRef.current) connectSSE()
	}, [JSON.stringify(watchedIds)])

	useEffect(() => {
		const allCompleted =
			watchedIds.length > 0 &&
			watchedIds.every(id => isLoadingArray.find(item => item.id === id)?.status.isComplete)

		if (allCompleted && isConnectedRef.current) {
			closeSSE()
		}

		if (allCompleted && watchedIds.length > 0) {
			;(async () => {
				try {
					const results = await Promise.all(
						watchedIds.map(async id => {
							try {
								const res = await generateT2VService.getGenerationInfo(id)
								return { id, generation: res.generation as BaseGenerationItem }
							} catch {
								return null
							}
						})
					)

					setMap(prev => {
						const updated = { ...prev }
						for (const r of results) {
							if (r && r.generation) updated[r.id] = r.generation
						}
						return updated
					})
				} catch {}
			})()
		}
	}, [JSON.stringify(isLoadingArray)])

	useEffect(() => {
		return () => {
			console.log('🧹 Компонент розмонтувався — закриваю SSE')
			closeSSE()
			activeIdsRef.current.clear()
			receivedIdsRef.current.clear()
			totalExpectedRef.current = 0
		}
	}, [])

	return map
}
