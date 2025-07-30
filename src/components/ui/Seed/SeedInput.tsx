'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelected } from 'store/slices/controlPanelSlice'
import type { RootState } from 'store/store'
import { debounce } from 'utils/debounce'
import { handleVibrate } from 'utils/handleVibrate'

export const SeedInput = () => {
	const [open, setOpen] = useState(false)
	const [seedInput, setSeedInput] = useState<number | ''>('')

	const wrapperRef = useRef<HTMLDivElement>(null)
	const panelRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const btnRef = useRef<HTMLButtonElement>(null)

	const dispatch = useDispatch()
	const currentSeed = useSelector((s: RootState) => s.controlPanel.selected.seed)

	useEffect(() => {
		if (open) setSeedInput(currentSeed ?? '')
	}, [open, currentSeed])

	const debouncedSetSeed = useMemo(
		() =>
			debounce((seed: number | null) => {
				dispatch(setSelected({ key: 'seed', value: seed }))
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

	const close = useCallback(() => {
		inputRef.current?.blur()
		setOpen(false)
		btnRef.current?.focus()
	}, [])

	const toggle = () => {
		if (open) close()
		else {
			setOpen(true)
			handleVibrate('light', 100)
			setTimeout(() => inputRef.current?.focus(), 0)
		}
	}

	const handleOutside = useCallback(
		(e: MouseEvent | TouchEvent) => {
			if (open && wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
				close()
			}
		},
		[open, close]
	)

	useEffect(() => {
		if (!open) return
		document.addEventListener('mousedown', handleOutside)
		document.addEventListener('touchstart', handleOutside)
		const esc = (e: KeyboardEvent) => e.key === 'Escape' && close()
		document.addEventListener('keydown', esc)
		return () => {
			document.removeEventListener('mousedown', handleOutside)
			document.removeEventListener('touchstart', handleOutside)
			document.removeEventListener('keydown', esc)
		}
	}, [open, handleOutside, close])

	useEffect(() => {
		if (panelRef.current) {
			;(panelRef.current as any).inert = !open
		}
	}, [open])

	return (
		<div ref={wrapperRef}>
			<button
				ref={btnRef}
				onClick={toggle}
				className='flex items-center justify-center w-[30px] h-[30px] rounded-full border border-dark-bg-transparency-12 bg-dark-bg-transparency-4 hover:bg-dark-bg-transparency-8 transition-colors duration-200'
			>
				<Image
					src='/icons/grow.svg'
					alt='Grow'
					width={16}
					height={16}
				/>
			</button>

			<div
				ref={panelRef}
				role='dialog'
				aria-modal='true'
				className={clsx(
					'absolute top-0 left-1/2 w-[90%] mt-2 z-50 -translate-x-1/2 -translate-y-[60%] shadow-seed-shadow bg-[#232327]/90 backdrop-blur-2xl p-3 rounded-xl transform-gpu transition-[opacity,transform] duration-200 ease-out',
					open
						? 'opacity-100 scale-100 -translate-y-1/2 pointer-events-auto'
						: 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
				)}
			>
				<div className='flex items-center justify-between mb-5'>
					<span className='text-xs text-dark-text-transparency-12 text-center'>Seed</span>
					<Image
						src='/icons/close.svg'
						alt='Close'
						width={16}
						height={16}
						className='cursor-pointer'
						onClick={close}
					/>
				</div>

				<div className='w-full rounded-2xl bg-black/20 p-2 border border-black/15'>
					<input
						ref={inputRef}
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
}
