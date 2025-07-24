'use client'

import cn from 'clsx'
import { NEXT_PUBLIC_API_URL } from 'constants/CONST_API'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import type { RootState } from 'store/store'

import { DownloadButton } from '@/ui/DownloadButton/DownloadButton'
import { ButtonBox } from '@/ui/Seed/SeedBox'
import VideoPlayer from '@/ui/VideoPlayer/VideoPlayer'

interface MediaModalProps {
	isOpen: boolean
	onClose: () => void
	data: {
		downloadUrl: string
		prompt?: string
		model?: string
		href?: string
		seed?: number | null
	}
	herf: string
	type?: 'video' | 'image' | 'audio'
}

export const MediaModal = ({ isOpen, onClose, data, type, herf }: MediaModalProps) => {
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
						href={
							type !== 'image'
								? `${NEXT_PUBLIC_API_URL}/${data.downloadUrl}`
								: `${NEXT_PUBLIC_API_URL}/${herf}`
						}
						fileName={`Generated-${Date.now()}.png`}
					/>

					{data.seed !== null && data.seed !== undefined && data.seed !== 0 && (
						<ButtonBox seed={data.seed} />
					)}

					<div>
						<h2 className='text-xs text-white/80 mb-1 max-w-[150px] truncate'>
							{data.prompt ? data.prompt.slice(0, 30) : ''}
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
				{/* <div className='fixed inset-0  bg-black'> */}
				{type === 'image' && (
					<Image
						src={`${NEXT_PUBLIC_API_URL}/${data.downloadUrl}`}
						alt='Generated Image'
						fill
						className='absolute top-1/2 left-1/2 w-[90%] h-auto object-contain '
					/>
				)}
				{/* </div> */}

				{type !== 'image' && <VideoPlayer src={data.downloadUrl} />}
			</motion.div>
		</div>,
		document.body
	)
}
