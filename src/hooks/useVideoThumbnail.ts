import { useEffect, useState } from 'react'
import { videoService } from 'services/video.service'

export function useVideoThumbnail(videoUrl: string, captureTimeSec = 1) {
	const [thumbnail, setThumbnail] = useState<string | null>(null)

	useEffect(() => {
		if (!videoUrl) return
		videoService.getVideoThumbnail(videoUrl, captureTimeSec).then(setThumbnail)
	}, [videoUrl, captureTimeSec])

	return { thumbnail }
}
