'use client'

import cn from 'clsx'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { handleVibrate } from 'utils/handleVibrate'

export const ButtonBox = ({ seed }: { seed: number }) => {
	const [isVisible, setIsVisible] = useState(false)
	const [isCopied, setIsCopied] = useState(false)
	const rootRef = useRef<HTMLDivElement>(null)

	const handleToggle = () => {
		setIsVisible(v => !v)
		setIsCopied(false)
		handleVibrate('light', 100)
	}

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(seed.toString())
			setIsCopied(true)
			setTimeout(() => setIsCopied(false), 2000)
			handleVibrate('light', 100)
		} catch (err) {
			console.error('Failed to copy seed:', err)
		}
	}

	useEffect(() => {
		if (!isVisible) return

		const handleOutside = (e: MouseEvent | TouchEvent) => {
			if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
				setIsVisible(false)
			}
		}

		document.addEventListener('pointerdown', handleOutside, { capture: true })
		return () => document.removeEventListener('pointerdown', handleOutside, { capture: true })
	}, [isVisible])

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsVisible(false)
		}
		document.addEventListener('keydown', onKey)
		return () => document.removeEventListener('keydown', onKey)
	}, [])

	return (
		<div
			ref={rootRef}
			className='relative'
		>
			<button
				onClick={handleToggle}
				className='py-2 px-3 flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md  border border-white/5'
			>
				<Image
					src='/icons/grow.svg'
					alt='Grow'
					width={16}
					height={16}
				/>
			</button>

			<div
				aria-hidden={!isVisible}
				className={cn(
					'absolute top-0 left-0 min-w-[200px] bg-[#232327]/95 p-3 rounded-xl shadow-seed-shadow translate-y-[50%] flex flex-col items-center',
					'transform-gpu transition-[opacity,transform] duration-200 ease-out',
					isVisible
						? 'opacity-100 scale-100 translate-y-[50%] pointer-events-auto'
						: 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
				)}
			>
				<span className='text-xs text-white/60'>Seed</span>

				<div
					className={cn(
						'flex items-center justify-between mt-2 py-2 px-3 rounded-2xl bg-black/40 border border-black/15 w-full',
						{ 'bg-green-300/40': isCopied }
					)}
				>
					<span>{seed}</span>

					<button
						onClick={handleCopy}
						className='p-2 rounded-lg bg-white/5 hover:bg-white/10 transition'
					>
						<Image
							src='/icons/copy.svg'
							alt='Copy Icon'
							width={16}
							height={16}
						/>
					</button>
				</div>
			</div>
		</div>
	)
}
