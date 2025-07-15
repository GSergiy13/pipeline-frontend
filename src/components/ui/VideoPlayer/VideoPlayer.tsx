'use client'

import { useEffect, useRef, useState } from 'react'
import { handleVibrate } from 'utils/handleVibrate'

import ControlPanel from './ControlPanel'

interface VideoPlayerProps {
	src: string
}

const VideoPlayer = ({ src }: VideoPlayerProps) => {
	const videoRef = useRef<HTMLVideoElement | null>(null)

	const [isPlaying, setIsPlaying] = useState(false)
	const [progress, setProgress] = useState(0)
	const [isDragging, setIsDragging] = useState(false)

	const togglePlay = () => {
		const video = videoRef.current
		if (!video) return
		handleVibrate('light', 100)

		if (video.paused) {
			video.play()
			setIsPlaying(true)
		} else {
			video.pause()
			setIsPlaying(false)
		}
	}

	const handleTimeUpdate = () => {
		const video = videoRef.current
		if (!video || isDragging || !video.duration) return
		setProgress((video.currentTime / video.duration) * 100)
	}

	const handleSeek = (percent: number) => {
		const video = videoRef.current
		if (!video || !video.duration) return
		video.currentTime = (percent / 100) * video.duration
		setProgress(percent)
	}

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		video.addEventListener('timeupdate', handleTimeUpdate)
		video.addEventListener('ended', () => {
			setIsPlaying(false)
			setProgress(0)
		})

		return () => {
			video.removeEventListener('timeupdate', handleTimeUpdate)
		}
	}, [isDragging])

	return (
		<div className='relative flex w-full h-full max-h-[90vh] items-center justify-center'>
			<video
				ref={videoRef}
				src={src}
				playsInline
				className='w-full h-full rounded-2xl object-contain'
			/>

			<ControlPanel
				isPlaying={isPlaying}
				progress={progress}
				onTogglePlay={togglePlay}
				onSeek={handleSeek}
				onDragStateChange={setIsDragging}
			/>
		</div>
	)
}

export default VideoPlayer
