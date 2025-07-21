import { useEffect, useState } from 'react'

import { Spinner } from '@/ui/Spinner/Spinner'

interface VideoPreviewProps {
	videoUrl: string
}

export const VideoPreview = ({ videoUrl }: VideoPreviewProps) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const [hasError, setHasError] = useState(false)

	useEffect(() => {
		setIsLoaded(false)
		setHasError(false)
	}, [videoUrl])

	return (
		<>
			{!isLoaded && !hasError && (
				<div className='absolute inset-0 flex items-center justify-center z-10 bg-black/10'>
					<Spinner />
				</div>
			)}
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
					⚠️ Не удалось загрузить превью
				</div>
			)}
		</>
	)
}
