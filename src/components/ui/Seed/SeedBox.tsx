'use client'

import Image from 'next/image'
import { useState } from 'react'

export const ButtonBox = ({ seed }: { seed: number }) => {
	const [isVisible, setIsVisible] = useState(false)
	const [isCopied, setIsCopied] = useState(false)

	const handleToggle = () => {
		setIsVisible(prev => !prev)
		setIsCopied(false) // reset copy status
	}

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(seed.toString())
			setIsCopied(true)
			setTimeout(() => setIsCopied(false), 2000)
		} catch (err) {
			console.error('Failed to copy seed:', err)
		}
	}

	return (
		<div className='relative'>
			<button
				onClick={handleToggle}
				className='py-2 px-3 flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/5'
			>
				<Image
					src='/icons/grow.svg'
					alt='Grow'
					width={16}
					height={16}
					className='pointer-events-auto'
				/>
			</button>

			{isVisible && (
				<div className='absolute top-0 left-0 min-w-[200px] bg-black/20 p-3 rounded-xl shadow-seed-shadow pointer-events-auto translate-y-[50%] flex items-center flex-col animate-fadeIn'>
					<span className='text-xs text-white/60'>Seed</span>

					<div className='flex items-center justify-between mt-2 py-2 px-3 rounded-2xl bg-black/40 border border-black/15 w-full'>
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
			)}
		</div>
	)
}
