import { NEXT_PUBLIC_BASE_URL } from 'constants/CONST_API'
import type {
	GetGenerationError,
	GetGenerationResponse,
	I2IRequest,
	ImageUploadError,
	ImageUploadResponse,
	T2ARequest,
	T2AResponse,
	T2VRequest,
	T2VResponse
} from 'types/IVideo.type'

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

		if (!res.ok) throw new Error(`Failed to generate video from ${endpoint}`)
		return (await res.json()) as T2VResponse
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

		if (!res.ok) throw new Error(`Failed to generate video from ${endpoint}`)
		return (await res.json()) as T2VResponse
	}

	async postAudioGeneration(payload: T2ARequest): Promise<T2AResponse> {
		console.log('Sending request to generate T2A with payload:', payload)

		const endpoint = '/api/generate/t2a'

		const res = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		})

		if (!res.ok) throw new Error(`Failed to generate audio from ${endpoint}`)
		return (await res.json()) as T2AResponse
	}

	async getGenerationInfo(generationId: string): Promise<GetGenerationResponse> {
		const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/generate/${generationId}`, {
			method: 'GET'
		})

		const data = (await res.json()) as GetGenerationResponse | GetGenerationError
		if (!res.ok || !data.success) {
			throw new Error((data as GetGenerationError).message || 'Unknown error')
		}
		return data as GetGenerationResponse
	}

	async uploadImage(file: File): Promise<{ url: string; filename: string }> {
		const formData = new FormData()
		formData.append('image', file)

		const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/images/upload`, {
			method: 'POST',
			body: formData
		})

		const data = (await res.json()) as ImageUploadResponse | ImageUploadError

		if (!res.ok || !data.success) throw new Error(data.message)

		return {
			url: data.url,
			filename: data.filename
		}
	}
}

export const generateT2VService = new GenerateT2VService()
