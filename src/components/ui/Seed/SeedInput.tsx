'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSeed } from 'store/slices/generationSlice'
import type { RootState } from 'store/store'
import { debounce } from 'utils/debounce'

export const SeedInput = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [mounted, setMounted] = useState(false)
	const [position, setPosition] = useState({ top: 0, left: 0 })
	const buttonRef = useRef<HTMLButtonElement>(null)

	const dispatch = useDispatch()
	const currentSeed = useSelector((s: RootState) => s.generation.selectedParams.seed)
	const [seedInput, setSeedInput] = useState<number | ''>(currentSeed ?? '')

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		if (isOpen && buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect()
			setPosition({
				top: rect.bottom + 8,
				left: rect.left + rect.width / 2
			})
		}
	}, [isOpen])

	useEffect(() => {
		if (isOpen) setSeedInput(currentSeed ?? '')
	}, [isOpen, currentSeed])

	const debouncedSetSeed = useMemo(
		() =>
			debounce((seed: number | null) => {
				dispatch(setSeed(seed))
			}, 500),
		[dispatch]
	)

	const handleSeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (value === '') {
			setSeedInput('')
			debouncedSetSeed(null)
		} else {
			const num = parseInt(value)
			if (!isNaN(num)) {
				setSeedInput(num)
				debouncedSetSeed(num)
			}
		}
	}

	const portalContent = (
		<div
			className='fixed z-[9999] pointer-events-none w-[90%]'
			style={{
				top: `${position.top}px`,
				left: `50%`,
				transform: 'translateX(-50%) translateY(-150%)'
			}}
		>
			<div className='relative w-full bg-black/5 backdrop-blur-2xl p-3 rounded-xl shadow-seed-shadow pointer-events-auto'>
				<div className='flex items-center justify-between mb-5'>
					<span className='text-xs text-dark-text-transparency-12'>Seed</span>
					<Image
						src='/icons/close.svg'
						alt='Close Icon'
						width={16}
						height={16}
						className='cursor-pointer'
						onClick={() => setIsOpen(false)}
					/>
				</div>

				<div className='w-full rounded-2xl bg-black/20 p-2 border border-black/15'>
					<input
						className='bg-transparent outline-none text-base w-full'
						type='number'
						value={seedInput}
						onChange={handleSeedChange}
						placeholder='Enter seed (optional)'
					/>
				</div>
			</div>
		</div>
	)

	return (
		<>
			<button
				ref={buttonRef}
				onClick={() => setIsOpen(prev => !prev)}
				className='relative flex items-center justify-center w-[30px] h-[30px] rounded-full border border-dark-bg-transparency-12 bg-dark-bg-transparency-4 hover:bg-dark-bg-transparency-8 transition-colors duration-200'
			>
				<Image
					src='/icons/grow.svg'
					alt='Grow Icon'
					width={16}
					height={16}
				/>
			</button>

			{isOpen && mounted && createPortal(portalContent, document.body)}
		</>
	)
}
