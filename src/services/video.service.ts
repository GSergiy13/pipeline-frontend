import { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_BASE_URL } from 'constants/CONST_API'

class VideoService {
	getProxyVideoUrl(downloadUrl: string): string {
		const actualVideoUrl = `${NEXT_PUBLIC_API_URL}/${downloadUrl}`
		const proxyUrl = `${NEXT_PUBLIC_BASE_URL}/api/video-proxy?url=${encodeURIComponent(actualVideoUrl)}`
		return proxyUrl
	}

	async getVideoThumbnail(videoUrl: string, captureTimeSec = 1): Promise<string | null> {
		return new Promise(resolve => {
			const isTelegramWebView = (): boolean => {
				const ua = navigator.userAgent.toLowerCase()
				return ua.includes('telegram') || (window as any).TelegramWebviewProxy != null
			}

			// 🛡 Блокуємо генерацію в Telegram WebView
			if (isTelegramWebView()) {
				console.warn('📵 Thumbnail disabled in Telegram WebView')
				return resolve(null)
			}

			const video = document.createElement('video')
			video.src = videoUrl
			video.crossOrigin = 'anonymous'
			video.preload = 'auto'
			video.muted = true
			video.playsInline = true

			const canvas = document.createElement('canvas')

			video.addEventListener('loadedmetadata', () => {
				video.currentTime = Math.min(video.duration, captureTimeSec)
			})

			video.addEventListener('seeked', () => {
				canvas.width = video.videoWidth
				canvas.height = video.videoHeight

				const ctx = canvas.getContext('2d')
				if (!ctx) {
					console.warn('🖼 No canvas context')
					return resolve(null)
				}

				try {
					ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
					const imageUrl = canvas.toDataURL('image/png')
					resolve(imageUrl)
				} catch (error) {
					console.error('❌ Canvas toDataURL failed:', error)
					resolve(null)
				}
			})

			video.addEventListener('error', e => {
				console.error('🎥 Video failed to load:', e, video.src)
				resolve(null)
			})

			video.load()
		})
	}
}

export const videoService = new VideoService()
