'use client'

import cn from 'clsx'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import type { RootState } from 'store/store'

import { DownloadButton } from '@/ui/DownloadButton/DownloadButton'
import VideoPlayer from '@/ui/VideoPlayer/VideoPlayer'

interface MediaModalProps {
	src: string
	isOpen: boolean
	onClose: () => void
}

export const MediaModal = ({ src, isOpen, onClose }: MediaModalProps) => {
	const isMobileTelegram = useSelector((state: RootState) => state.user.isMobileTelegram)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
		document.body.style.overflow = isOpen ? 'hidden' : ''
		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	if (!mounted || !isOpen) return null

	return createPortal(
		<div
			className={cn(
				`fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-lg`,
				{
					'tg-modal': isMobileTelegram
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
						href='/video/scen_1.mp4'
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
						<h2 className='text-xs text-white/80 mb-1'>Video Title</h2>
						<p className='text-xs text-white/80'>Hailuo 02 (1080p/10s)</p>
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

				<VideoPlayer src={src} />
			</motion.div>
		</div>,
		document.body
	)
}
