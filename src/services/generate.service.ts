import { NEXT_PUBLIC_BASE_URL } from 'constants/CONST_API'
import type {
	ApiResponse,
	GenerationDetails,
	I2IRequest,
	ImageUploadSuccess,
	T2ARequest,
	T2AResponse,
	T2VRequest,
	T2VResponse
} from 'types/Generation.type'

class GenerateT2VService {
	async postExploreVideos(payload: T2VRequest, isImageMode = false): Promise<T2VResponse> {
		const endpoint = isImageMode ? `${NEXT_PUBLIC_BASE_URL}/api/generate/i2v` : '/api/generate/t2v'

		const res = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		})

		const data: T2VResponse = await res.json()
		console.log('Video generation response:', data)
		if (!res.ok || !data.success || !data.data) {
			throw new Error(data.message || `Failed to generate video from ${endpoint}`)
		}

		return data
	}

	async postImageToImage(payload: I2IRequest): Promise<T2VResponse> {
		const endpoint = `${NEXT_PUBLIC_BASE_URL}/api/generate/i2i`

		const res = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		})

		const data: T2VResponse = await res.json()
		if (!res.ok || !data.success || !data.data) {
			throw new Error(data.message || `Failed to generate video from ${endpoint}`)
		}

		return data
	}

	async postAudioGeneration(payload: T2ARequest): Promise<T2AResponse> {
		const endpoint = '/api/generate/t2a'

		const res = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		})

		const data: T2AResponse = await res.json()
		if (!res.ok || !data.success || !data.data) {
			throw new Error(data.message || `Failed to generate audio from ${endpoint}`)
		}

		return data
	}

	async getGenerationInfo(generationId: string): Promise<ApiResponse<GenerationDetails>> {
		const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/generate/${generationId}`, {
			method: 'GET'
		})

		const data: ApiResponse<GenerationDetails> = await res.json()

		if (!res.ok || !data.success || !data.data) {
			throw new Error(data.message || 'Unknown error')
		}

		return data
	}

	async uploadImage(file: File): Promise<{ url: string; filename: string }> {
		const formData = new FormData()
		formData.append('image', file)

		const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/images/upload`, {
			method: 'POST',
			body: formData
		})

		const data: ImageUploadSuccess = await res.json()

		if (!res.ok || !data.success || !data.data) {
			throw new Error(data.message || 'Image upload failed')
		}

		return {
			url: data.data.url,
			filename: data.data.filename
		}
	}
}

export const generateT2VService = new GenerateT2VService()
