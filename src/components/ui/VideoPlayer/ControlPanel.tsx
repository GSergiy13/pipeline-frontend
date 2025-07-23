'use client'

import { useAnimatedProgress } from 'hooks/useAnimatedProgress'
import Image from 'next/image'
import { memo, useCallback, useEffect, useRef, useState } from 'react'

interface ControlPanelProps {
	isPlaying: boolean
	progress: number
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
	const [dragging, setDragging] = useState(false)
	const animated = useAnimatedProgress(progress, dragging)

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

	const stopDrag = () => {
		setDragging(false)
		onDragStateChange(false)
	}

	useEffect(() => {
		const move = (e: MouseEvent) => dragging && seekFromClientX(e.clientX)
		const up = () => dragging && stopDrag()

		window.addEventListener('mousemove', move)
		window.addEventListener('mouseup', up)
		return () => {
			window.removeEventListener('mousemove', move)
			window.removeEventListener('mouseup', up)
		}
	}, [dragging, seekFromClientX])

	useEffect(() => {
		const move = (e: TouchEvent) => dragging && seekFromClientX(e.touches[0].clientX)
		const end = () => dragging && stopDrag()

		window.addEventListener('touchmove', move)
		window.addEventListener('touchend', end)
		return () => {
			window.removeEventListener('touchmove', move)
			window.removeEventListener('touchend', end)
		}
	}, [dragging, seekFromClientX])

	return (
		<div className='absolute inset-x-0 z-10 bottom-4 px-4 flex flex-col items-center'>
			<div
				ref={barRef}
				className='relative w-full h-6 mb-4 cursor-pointer touch-none'
				onMouseDown={e => startDrag(e.clientX)}
				onTouchStart={e => startDrag(e.touches[0].clientX)}
			>
				<div className='absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 rounded-lg -translate-y-1/2 pointer-events-none' />

				<div
					className='absolute top-1/2 left-0 h-0.5 bg-progress-bar-gradient rounded-lg -translate-y-1/2 transition-all duration-75 ease-linear pointer-events-none'
					style={{ width: `${animated}%` }}
				>
					<div className='absolute -right-[6px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md' />
				</div>
			</div>

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
