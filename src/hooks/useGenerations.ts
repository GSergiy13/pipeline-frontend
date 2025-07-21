import { useEffect, useRef, useState } from 'react'
import type { GenerationDetails } from 'types/IVideo.type'
import { waitUntilAnyVideoReady } from 'utils/waitUntilAnyVideoReady'

export function useGenerations(ids: string[], tgId?: string | number) {
	const [map, setMap] = useState<Record<string, GenerationDetails>>({})
	const stopsRef = useRef<(() => void)[]>([])

	useEffect(() => {
		if (!ids.length || !tgId) return

		stopsRef.current.forEach(stop => stop())
		stopsRef.current = []
		setMap({})

		ids.forEach(id => {
			const stop = waitUntilAnyVideoReady([id], tgId, (readyId, generation) => {
				setMap(prev => (prev[readyId] ? prev : { ...prev, [readyId]: generation }))
			})
			stopsRef.current.push(stop)
		})

		return () => {
			stopsRef.current.forEach(stop => stop())
			stopsRef.current = []
		}
	}, [ids.join(','), tgId])

	return map
}
