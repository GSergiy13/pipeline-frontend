import { useEffect, useRef, useState } from 'react'
import type { GenerationDetails } from 'types/IVideo.type'
import { waitUntilAnyVideoReady } from 'utils/waitUntilAnyVideoReady'

export function useGenerations(videoIds: string[], telegramId: string | number | undefined) {
	const [map, setMap] = useState<Record<string, GenerationDetails>>({})
	const stopsRef = useRef<(() => void)[]>([])

	useEffect(() => {
		if (!videoIds.length || !telegramId) return

		stopsRef.current.forEach(stop => stop())
		stopsRef.current = []
		setMap({})

		videoIds.forEach(id => {
			const stop = waitUntilAnyVideoReady([id], telegramId, (readyId, generation) => {
				setMap(prev => ({ ...prev, [readyId]: generation }))
			})
			stopsRef.current.push(stop)
		})

		return () => {
			stopsRef.current.forEach(stop => stop())
			stopsRef.current = []
		}
	}, [videoIds, telegramId])

	return map
}
