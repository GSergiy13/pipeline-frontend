import { useEffect, useRef, useState } from 'react'

import { Spinner } from '@/ui/Spinner/Spinner'

interface VideoPreviewProps {
	videoUrl: string
	durationLimit?: number
}

export const VideoPreview = ({ videoUrl, durationLimit = 3 }: VideoPreviewProps) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const [hasError, setHasError] = useState(false)
	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		setIsLoaded(false)
		setHasError(false)
	}, [videoUrl])

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		const handleTimeUpdate = () => {
			if (video.currentTime >= durationLimit) {
				video.pause()
			}
		}

		video.addEventListener('timeupdate', handleTimeUpdate)
		return () => {
			video.removeEventListener('timeupdate', handleTimeUpdate)
		}
	}, [durationLimit])

	return (
		<>
			{!isLoaded && !hasError && (
				<div className='absolute inset-0 flex items-center justify-center z-10 bg-black/10'>
					<Spinner />
				</div>
			)}

			{!hasError ? (
				<video
					ref={videoRef}
					src={videoUrl}
					muted
					playsInline
					autoPlay
					preload='auto'
					onLoadedData={() => setIsLoaded(true)}
					onError={() => setHasError(true)}
					className='object-cover w-full h-full rounded-[32px] will-change-transform'
				/>
			) : (
				<div className='w-full h-full bg-gray-800 flex items-center justify-center text-white text-xs'>
					⚠️ Не удалось загрузить превью
				</div>
			)}
		</>
	)
}
