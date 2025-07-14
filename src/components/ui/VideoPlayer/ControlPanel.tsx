'use client'

import Image from 'next/image'
import { memo, useCallback, useEffect, useRef, useState } from 'react'

interface ControlPanelProps {
	isPlaying: boolean
	progress: number // 0‒100
	onTogglePlay: () => void
	onSeek: (percent: number) => void
	onDragStateChange: (dragging: boolean) => void
}

const ControlPanel = ({
	isPlaying,
	progress,
	onTogglePlay,
	onSeek,
	onDragStateChange
}: ControlPanelProps) => {
	const barRef = useRef<HTMLDivElement | null>(null)
	const [animated, setAnimated] = useState(progress)
	const [dragging, setDragging] = useState(false)

	/* -------- плавна анімація прогрес-бару -------- */
	useEffect(() => {
		let frame = 0
		const tick = () => {
			setAnimated(prev => {
				const delta = progress - prev
				if (Math.abs(delta) < 0.1) return progress
				return prev + delta * 0.1
			})
			frame = requestAnimationFrame(tick)
		}
		tick()
		return () => cancelAnimationFrame(frame)
	}, [progress])

	/* --------- drag / seek logic --------- */
	const seekFromClientX = useCallback(
		(clientX: number) => {
			const bar = barRef.current
			if (!bar) return
			const { left, width } = bar.getBoundingClientRect()
			const percent = Math.min(Math.max((clientX - left) / width, 0), 1) * 100
			onSeek(percent)
		},
		[onSeek]
	)

	const startDrag = (clientX: number) => {
		setDragging(true)
		onDragStateChange(true)
		seekFromClientX(clientX)
	}

	/* mouse */
	useEffect(() => {
		const move = (e: MouseEvent) => dragging && seekFromClientX(e.clientX)
		const up = () => {
			if (dragging) {
				setDragging(false)
				onDragStateChange(false)
			}
		}
		window.addEventListener('mousemove', move)
		window.addEventListener('mouseup', up)
		return () => {
			window.removeEventListener('mousemove', move)
			window.removeEventListener('mouseup', up)
		}
	}, [dragging, seekFromClientX, onDragStateChange])

	/* touch */
	useEffect(() => {
		const move = (e: TouchEvent) => dragging && seekFromClientX(e.touches[0].clientX)
		const end = () => {
			if (dragging) {
				setDragging(false)
				onDragStateChange(false)
			}
		}
		window.addEventListener('touchmove', move)
		window.addEventListener('touchend', end)
		return () => {
			window.removeEventListener('touchmove', move)
			window.removeEventListener('touchend', end)
		}
	}, [dragging, seekFromClientX, onDragStateChange])

	/* ---------------- render ---------------- */
	return (
		<div className='absolute inset-x-0 bottom-4 px-4 flex flex-col items-center'>
			{/* progress bar */}
			<div
				ref={barRef}
				className='w-full h-0.5 bg-white/10 mb-4 rounded-lg cursor-pointer touch-none'
				onMouseDown={e => startDrag(e.clientX)}
				onTouchStart={e => startDrag(e.touches[0].clientX)}
			>
				<div
					className='h-full bg-progress-bar-gradient transition-all duration-75 ease-linear relative'
					style={{ width: `${animated}%` }}
				>
					<div className='absolute -right-[6px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md' />
				</div>
			</div>

			{/* play / pause */}
			<button
				onClick={onTogglePlay}
				className='w-16 h-16 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/60 backdrop-blur-md rounded-full transition-colors'
			>
				<Image
					src={isPlaying ? '/icons/pause.svg' : '/icons/play.svg'}
					alt='Toggle playback'
					width={24}
					height={24}
				/>
			</button>
		</div>
	)
}

export default memo(ControlPanel)
