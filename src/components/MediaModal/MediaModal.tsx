'use client'

import cn from 'clsx'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import type { RootState } from 'store/store'
import type { GenerationDetails } from 'types/IVideo.type'

import { DownloadButton } from '@/ui/DownloadButton/DownloadButton'
import VideoPlayer from '@/ui/VideoPlayer/VideoPlayer'

interface MediaModalProps {
	isOpen: boolean
	onClose: () => void
	data: GenerationDetails
}

export const MediaModal = ({ isOpen, onClose, data }: MediaModalProps) => {
	const isMobileTelegram = useSelector((state: RootState) => state.user.isMobileTelegram)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
		document.body.style.overflow = isOpen ? 'hidden' : ''
		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	console.log('data:', data)

	if (!mounted || !isOpen) return null

	return createPortal(
		<div
			className={cn(
				`fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-lg`,
				{
					'tg-safe-area': isMobileTelegram
				}
			)}
			onClick={onClose}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.95 }}
				transition={{ duration: 0.2 }}
				className='relative w-full h-full px-4 flex items-center justify-center pt-5 pb-4'
				onClick={e => e.stopPropagation()}
			>
				<div className='absolute gap-2 top-5 w-full px-4 flex items-center z-40'>
					<DownloadButton
						className='relative'
						href={data.downloadUrl}
						fileName='Hailuo02.mp4'
					/>

					<div className='py-2 px-3 flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/5'>
						<Image
							src={'/icons/grow.svg'}
							alt='Grow'
							width={16}
							height={16}
							className='pointer-events-auto'
						/>
					</div>

					<div>
						<h2 className='text-xs text-white/80 mb-1 max-w-[150px] truncate'>
							{data.prompt.slice(0, 30)}
						</h2>
						<p className='text-xs text-white/80'>{data.model}</p>
					</div>

					<button
						className='p-2 border border-white/10 rounded-full ml-auto hover:bg-white/20 transition-colors'
						onClick={onClose}
					>
						<Image
							src={'/icons/crossed.svg'}
							alt='Close'
							width={24}
							height={24}
						/>
					</button>
				</div>

				<VideoPlayer src={data.downloadUrl} />
			</motion.div>
		</div>,
		document.body
	)
}
