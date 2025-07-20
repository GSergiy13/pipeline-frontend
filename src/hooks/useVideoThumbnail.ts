import { useEffect, useState } from 'react'

export function useVideoThumbnail(videoUrl: string, captureTimeSec = 1) {
	const [thumbnail, setThumbnail] = useState<string | null>(null)

	useEffect(() => {
		if (!videoUrl) return

		const video = document.createElement('video')
		video.src = videoUrl
		video.crossOrigin = 'anonymous'
		video.preload = 'auto'
		video.muted = true
		video.playsInline = true

		const canvas = document.createElement('canvas')

		const handleSeeked = () => {
			canvas.width = video.videoWidth
			canvas.height = video.videoHeight
			const ctx = canvas.getContext('2d')
			if (!ctx) return

			ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
			const imageUrl = canvas.toDataURL('image/png')
			setThumbnail(imageUrl)
		}

		const handleLoadedMetadata = () => {
			video.currentTime = Math.min(video.duration, captureTimeSec)
		}

		video.addEventListener('loadedmetadata', handleLoadedMetadata)
		video.addEventListener('seeked', handleSeeked)
		video.load()

		return () => {
			video.removeEventListener('loadedmetadata', handleLoadedMetadata)
			video.removeEventListener('seeked', handleSeeked)
		}
	}, [videoUrl, captureTimeSec])

	return { thumbnail }
}
