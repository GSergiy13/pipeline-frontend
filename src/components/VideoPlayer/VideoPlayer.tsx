'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface VideoPlayerProps {
	src: string
	isOpen: boolean
	onClose: () => void
}

export const VideoPlayer = ({ src, isOpen, onClose }: VideoPlayerProps) => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}

		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	if (!mounted || !isOpen) return null

	return createPortal(
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg'
			onClick={onClose}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.95 }}
				transition={{ duration: 0.2 }}
				className='relative w-full h-full px-4 flex items-center justify-center'
				onClick={e => e.stopPropagation()}
			>
				<div className='absolute gap-2 top-5 w-full px-4 flex items-center'>
					<div className='py-2 px-3 flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/5'>
						<Image
							src={'/icons/download.svg'}
							alt='Download Icon'
							width={16}
							height={16}
							className='pointer-events-auto'
						/>
					</div>

					<div className='py-2 px-3 flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/5'>
						<Image
							src={'/icons/grow.svg'}
							alt='Download Icon'
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

				<video
					src={src}
					controls
					autoPlay
					className='rounded-2xl w-full h-full max-h-[90vh] object-contain'
				/>
			</motion.div>
		</div>,
		document.body
	)
}
