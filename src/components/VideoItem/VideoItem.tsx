'use client'

import cn from 'clsx'
import { MediaModal } from 'components/MediaModal/MediaModal'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import type { GenerationDetails } from 'types/IVideo.type'
import { handleVibrate } from 'utils/handleVibrate'

import { DownloadButton } from '@/ui/DownloadButton/DownloadButton'

interface VideoItemProps {
	className?: string
	isCompactLayout?: boolean
	data: GenerationDetails
}

export const VideoItem = ({ className, isCompactLayout = false, data }: VideoItemProps) => {
	const [isPlaying, setIsPlaying] = useState(false)

	const handleOpen = useCallback(() => {
		setIsPlaying(true)
		handleVibrate('light', 100)
	}, [])

	const handleClose = useCallback(() => {
		setIsPlaying(false)
		handleVibrate('light', 100)
	}, [])

	return (
		<>
			<div className={cn('relative flex items-center justify-center cursor-pointer', className)}>
				<video
					src={`${process.env.NEXT_PUBLIC_API_URL}/${data.downloadUrl}`}
					controls={false}
					className='object-cover w-full h-full rounded-[32px] will-change-transform'
				></video>

				<div className='absolute inset-0 bg-video-gradient flex items-center justify-center will-change-transform rounded-[30px] pointer-events-none'>
					<DownloadButton
						className='absolute left-3 top-3'
						href={data.downloadUrl}
						fileName='Hailuo02.mp4'
					/>

					<div
						className={cn(
							'absolute left-1/2 top-1/2 flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-md border border-white/5 hover:bg-white/10 transition-all duration-300 ease-in-out pointer-events-auto',
							{
								'py-4 px-4 -translate-x-1/2 -translate-y-[60%]': isCompactLayout,
								'py-5 px-5 -translate-x-1/2 -translate-y-1/2': !isCompactLayout
							}
						)}
						onClick={handleOpen}
					>
						<Image
							src='/icons/play.svg'
							alt='Play Icon'
							width={24}
							height={24}
						/>
					</div>

					<div className='absolute bottom-3 left-3 text-white'>
						<h2 className='text-xs text-white/80 mb-1 max-w-[150px] truncate'>
							{data.prompt.slice(0, 40)}
						</h2>
						<p className='text-xs text-white/80'>{data.model}</p>
					</div>
				</div>
			</div>

			<MediaModal
				data={data}
				isOpen={isPlaying}
				onClose={handleClose}
			/>
		</>
	)
}
