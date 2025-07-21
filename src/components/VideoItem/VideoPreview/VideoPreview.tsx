import { useEffect, useState } from 'react'

import { Spinner } from '@/ui/Spinner/Spinner'

interface VideoPreviewProps {
	videoUrl: string
	className?: string
	alt?: string
}

export const VideoPreview = ({ videoUrl, className, alt = 'Preview' }: VideoPreviewProps) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const [hasError, setHasError] = useState(false)

	useEffect(() => {
		// Reset state on URL change
		setIsLoaded(false)
		setHasError(false)
	}, [videoUrl])

	return (
		<>
			{' '}
			{!isLoaded && !hasError && <Spinner />}
			{!hasError ? (
				<video
					src={videoUrl}
					muted
					playsInline
					onCanPlay={() => setIsLoaded(true)}
					onError={() => setHasError(true)}
					className='object-cover w-full h-full rounded-[32px] will-change-transform'
				/>
			) : (
				<div className='w-full h-full bg-gray-800 flex items-center justify-center text-white text-xs'>
					⚠️ Не вдалося завантажити прев’ю
				</div>
			)}
		</>
	)
}
