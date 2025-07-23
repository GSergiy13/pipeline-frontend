import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setVideoLoading } from 'store/slices/generationSlice'
import type { AudioGenerationDetails, GenerationDetails } from 'types/IVideo.type'
import { waitUntilAnyVideoReady } from 'utils/waitUntilAnyVideoReady'

export function useGenerations(ids: string[]) {
	const [map, setMap] = useState<Record<string, GenerationDetails | AudioGenerationDetails>>({})
	const stopsRef = useRef<(() => void)[]>([])
	const dispatch = useDispatch()

	useEffect(() => {
		if (!ids.length) return

		stopsRef.current.forEach(stop => stop())
		stopsRef.current = []
		setMap({})

		ids.forEach(id => {
			const stop = waitUntilAnyVideoReady([id], (readyId, generation) => {
				dispatch(setVideoLoading({ videoId: readyId, isLoading: false }))
				setMap(prev => (prev[readyId] ? prev : { ...prev, [readyId]: generation }))
			})
			stopsRef.current.push(stop)
		})

		return () => {
			stopsRef.current.forEach(stop => stop())
			stopsRef.current = []
		}
	}, [ids.join(',')])

	return map
}
