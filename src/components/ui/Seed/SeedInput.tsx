'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSeed } from 'store/slices/generationSlice'
import type { RootState } from 'store/store'
import { debounce } from 'utils/debounce'
import { handleVibrate } from 'utils/handleVibrate'

export const SeedInput = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [mounted, setMounted] = useState(false)
	const [position, setPosition] = useState<{ top: number; left: number } | null>(null)

	const buttonRef = useRef<HTMLButtonElement>(null)
	const portalRef = useRef<HTMLDivElement>(null)

	const dispatch = useDispatch()
	const currentSeed = useSelector((s: RootState) => s.generation.selectedParams.seed)
	const [seedInput, setSeedInput] = useState<number | ''>(currentSeed ?? '')

	useEffect(() => setMounted(true), [])

	useEffect(() => {
		if (!isOpen) return
		const prev = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = prev
		}
	}, [isOpen])

	useEffect(() => {
		if (!isOpen || !buttonRef.current) return
		const rect = buttonRef.current.getBoundingClientRect()
		const overlayH = 230
		const preferTop = rect.bottom + 8
		const safeTop =
			preferTop + overlayH > window.innerHeight ? Math.max(rect.top - overlayH - 8, 16) : preferTop

		setPosition({
			top: safeTop,
			left: rect.left + rect.width / 2
		})
	}, [isOpen])

	useEffect(() => {
		if (isOpen) setSeedInput(currentSeed ?? '')
	}, [isOpen, currentSeed])

	const handleOutside = useCallback(
		(e: MouseEvent | TouchEvent) => {
			if (
				isOpen &&
				portalRef.current &&
				!portalRef.current.contains(e.target as Node) &&
				!buttonRef.current?.contains(e.target as Node)
			) {
				setIsOpen(false)
			}
		},
		[isOpen]
	)

	useEffect(() => {
		if (!isOpen) return
		document.addEventListener('mousedown', handleOutside)
		document.addEventListener('touchstart', handleOutside)
		const esc = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false)
		document.addEventListener('keydown', esc)
		return () => {
			document.removeEventListener('mousedown', handleOutside)
			document.removeEventListener('touchstart', handleOutside)
			document.removeEventListener('keydown', esc)
		}
	}, [isOpen, handleOutside])

	const debouncedSetSeed = useMemo(
		() =>
			debounce((seed: number | null) => {
				dispatch(setSeed(seed))
			}, 500),
		[dispatch]
	)

	const handleSeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value
		if (val === '') {
			setSeedInput('')
			debouncedSetSeed(null)
		} else {
			const num = parseInt(val)
			if (!Number.isNaN(num)) {
				setSeedInput(num)
				debouncedSetSeed(num)
			}
		}
	}

	const handlerOpen = () => {
		setIsOpen(prev => !prev)
		handleVibrate('light', 100)
	}

	const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

	const portalContent = (
		<div
			ref={portalRef}
			className='fixed z-[9999] pointer-events-none w-[90%] md:w-auto'
			style={
				isMobile
					? {
							bottom: '15%',
							left: '50%',
							transform: 'translateX(-50%)'
						}
					: position
						? {
								top: position.top,
								left: position.left,
								transform: 'translateX(-50%)'
							}
						: {}
			}
		>
			<div className='relative w-full bg-white/20 backdrop-blur-2xl p-3 rounded-xl shadow-seed-shadow pointer-events-auto'>
				<div className='flex items-center justify-between mb-5'>
					<span className='text-xs text-dark-text-transparency-12 text-center'>Seed</span>
					<Image
						src='/icons/close.svg'
						alt='Close'
						width={16}
						height={16}
						className='cursor-pointer'
						onClick={() => setIsOpen(false)}
					/>
				</div>

				<div className='w-full rounded-2xl bg-black/20 p-2 border border-black/15'>
					<input
						className='bg-transparent outline-none text-base w-full appearance-none'
						type='number'
						inputMode='numeric'
						value={seedInput}
						onChange={handleSeedChange}
						placeholder='Enter seed'
					/>
				</div>
			</div>
		</div>
	)

	return (
		<>
			<button
				ref={buttonRef}
				onClick={handlerOpen}
				className='relative flex items-center justify-center w-[30px] h-[30px] rounded-full border border-dark-bg-transparency-12 bg-dark-bg-transparency-4 hover:bg-dark-bg-transparency-8 transition-colors duration-200'
			>
				<Image
					src='/icons/grow.svg'
					alt='Grow'
					width={16}
					height={16}
				/>
			</button>

			{isOpen && mounted && createPortal(portalContent, document.body)}
		</>
	)
}
