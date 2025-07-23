import cn from 'clsx'
import { MediaModal } from 'components/MediaModal/MediaModal'
import { NEXT_PUBLIC_API_URL } from 'constants/CONST_API'
import Image from 'next/image'
import { memo, useCallback, useState } from 'react'
import type { GenerationDetailsImgToImg } from 'types/IVideo.type'
import { handleVibrate } from 'utils/handleVibrate'

import { DownloadButton } from '@/ui/DownloadButton/DownloadButton'

export const ImageItem = memo(
	({ data, className }: { data: GenerationDetailsImgToImg; className?: string }) => {
		console.log('ImageItem rendered', data)
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
				<div className={cn(`relative w-full h-full rounded-[30px] overflow-hidden ${className}`)}>
					<DownloadButton
						className='absolute left-3 top-3
			z-10'
						href={`${data.imageUrl}`}
						fileName='GeneratedImage.png'
					/>

					<div
						className='absolute right-3 top-3
			z-10 py-2 px-3 flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/5 pointer-events-auto'
						onClick={handleOpen}
					>
						<Image
							src='/icons/expand.svg'
							alt='scale'
							width={16}
							height={16}
							className='w-4 h-4'
						/>
					</div>

					<Image
						src={`${NEXT_PUBLIC_API_URL}/${data.downloadUrl}`}
						alt='Generated Image'
						fill
						className='object-cover '
						sizes='100vw'
					/>
				</div>

				<MediaModal
					type='image'
					data={data}
					isOpen={isPlaying}
					onClose={handleClose}
				/>
			</>
		)
	}
)
