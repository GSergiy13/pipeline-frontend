import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setVideoLoading } from 'store/slices/generationSlice'
import type {
	AudioGenerationDetails,
	GenerationDetails,
	GenerationDetailsImgToImg
} from 'types/IVideo.type'
import { waitUntilAnyVideoReady } from 'utils/waitUntilAnyVideoReady'

type BaseGenerationItem = GenerationDetails | AudioGenerationDetails | GenerationDetailsImgToImg

export function useGenerations(ids: string[]) {
	const [map, setMap] = useState<Record<string, BaseGenerationItem>>({})
	const dispatch = useDispatch()
	const stopRef = useRef<(() => void) | undefined>(undefined)

	useEffect(() => {
		if (!ids.length) return

		stopRef.current?.()
		stopRef.current = undefined
		setMap({})

		const stop = waitUntilAnyVideoReady(
			[...ids],
			(id, generation) => {
				dispatch(setVideoLoading({ videoId: id, isLoading: false }))
				setMap(prev => (prev[id] ? prev : { ...prev, [id]: generation }))
			},
			dispatch
		)

		stopRef.current = stop

		return () => {
			stop?.()
			stopRef.current = undefined
		}
	}, [ids.join(',')])

	return map
}
