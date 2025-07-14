'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'
import { handleVibrate } from 'utils/handleVibrate'

export const VideoItem = () => {
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
			<div
				className='relative w-full h-full flex items-center justify-center cursor-pointer max-w-[640px] max-h-[480px] mobile:max-h-full'
				onClick={handleOpen}
			>
				<Image
					src={'/video/video_1.jpg'}
					alt='Video Thumbnail'
					fill
					className='object-cover rounded-[32px] will-change-transform'
					sizes='100vw'
					priority
				/>

				<div className='absolute inset-0 bg-video-gradient flex items-center justify-center will-change-transform rounded-[30px] pointer-events-none'>
					<div className='absolute left-3 top-3 py-2 px-3 flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/5'>
						<Image
							src={'/icons/download.svg'}
							alt='Download Icon'
							width={16}
							height={16}
							className='pointer-events-auto'
						/>
					</div>
					<div className='absolute left-1/2 top-1/2 py-5 px-5 flex items-center gap-2 rounded-full -translate-x-1/2 -translate-y-1/2 bg-white/5 backdrop-blur-md border border-white/5 hover:bg-white/10 transition-all duration-300 ease-in-out pointer-events-auto'>
						<Image
							src={'/icons/play.svg'}
							alt='Play Icon'
							width={24}
							height={24}
						/>
					</div>
					<div className='absolute left-3 top-3 py-2 px-3 flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/5'>
						<Image
							src={'/icons/download.svg'}
							alt='Download Icon'
							width={16}
							height={16}
							className='pointer-events-auto'
						/>
					</div>
					<div className='absolute bottom-3 left-3 text-white'>
						<h2 className='text-xs text-white/80 mb-1'>Video Title</h2>
						<p className='text-xs text-white/80'>Hailuo 02 (1080p/10s)</p>
					</div>
				</div>
			</div>

			{/* <VideoPlayer
				src='/video/scen_1.mp4'
				isOpen={isPlaying}
				onClose={handleClose}
			/> */}
		</>
	)
}
