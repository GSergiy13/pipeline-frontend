'use client'

import cn from 'clsx'
import { MediaModal } from 'components/MediaModal/MediaModal'
import { useVideoThumbnail } from 'hooks/useVideoThumbnail'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { handleVibrate } from 'utils/handleVibrate'

import { DownloadButton } from '@/ui/DownloadButton/DownloadButton'

interface VideoItemProps {
	className?: string
	videoUrl?: string
	isCompactLayout?: boolean
}

export const VideoItem = ({ className, videoUrl, isCompactLayout = false }: VideoItemProps) => {
	const [isPlaying, setIsPlaying] = useState(false)

	const actualVideoUrl = `https://api.sibrik.io/${videoUrl}`
	const proxyUrl = `/api/video-proxy?url=${encodeURIComponent(actualVideoUrl)}`
	const { thumbnail } = useVideoThumbnail(proxyUrl)

	const handleOpen = useCallback(() => {
		setIsPlaying(true)
		handleVibrate('light', 100)
	}, [])

	const handleClose = useCallback(() => {
		setIsPlaying(false)
		handleVibrate('light', 100)
	}, [])

	console.log('VideoItem rendered with videoUrl:', thumbnail)

	return (
		<>
			<div className={cn('relative flex items-center justify-center cursor-pointer', className)}>
				<Image
					src={thumbnail || '/video/video_1.jpg'}
					alt='Video Thumbnail'
					fill
					className='object-cover rounded-[32px] will-change-transform'
					sizes='100vw'
					priority
				/>

				<div className='absolute inset-0 bg-video-gradient flex items-center justify-center will-change-transform rounded-[30px] pointer-events-none'>
					<DownloadButton
						className='absolute left-3 top-3'
						href={`https://api.sibrik.io/${videoUrl}`}
						fileName='Hailuo02.mp4'
					/>

					<div
						className={cn(
							'absolute left-1/2 top-1/2  flex items-center gap-2 rounded-full  bg-white/5 backdrop-blur-md border border-white/5 hover:bg-white/10 transition-all duration-300 ease-in-out pointer-events-auto',
							{
								'py-4 px-4 -translate-x-1/2 -translate-y-[60%]': isCompactLayout,
								'py-5 px-5 -translate-x-1/2 -translate-y-1/2': !isCompactLayout
							}
						)}
						onClick={handleOpen}
					>
						<Image
							src={'/icons/play.svg'}
							alt='Play Icon'
							width={24}
							height={24}
						/>
					</div>

					<div className='absolute bottom-3 left-3 text-white'>
						<h2 className='text-xs text-white/80 mb-1'>Video Title</h2>
						<p className='text-xs text-white/80'>Hailuo 02 (1080p/10s)</p>
					</div>
				</div>
			</div>

			<MediaModal
				src={`https://api.sibrik.io/${videoUrl}`}
				isOpen={isPlaying}
				onClose={handleClose}
			/>
		</>
	)
}
