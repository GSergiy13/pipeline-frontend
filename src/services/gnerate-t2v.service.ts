import type {
	GetGenerationError,
	GetGenerationResponse,
	ImageUploadError,
	ImageUploadResponse,
	T2VRequest,
	T2VResponse
} from 'types/IVideo.type'

class GenerateT2VService {
	async postExploreVideos(
		payload: T2VRequest,
		telegramId: string,
		isImageMode = false
	): Promise<T2VResponse> {
		console.log(
			`Sending request to generate ${isImageMode ? 'I2V' : 'T2V'} with payload:`,
			payload,
			'and Telegram ID:',
			telegramId
		)

		const endpoint = isImageMode ? '/api/generate/i2v' : '/api/generate/t2v'

		const res = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Telegram-ID': telegramId
			},
			body: JSON.stringify(payload)
		})

		if (!res.ok) throw new Error(`Failed to generate video from ${endpoint}`)
		return (await res.json()) as T2VResponse
	}

	async getGenerationInfo(
		generationId: string,
		telegramId: string
	): Promise<GetGenerationResponse> {
		const res = await fetch(`/api/generate/${generationId}`, {
			method: 'GET',
			headers: { 'X-Telegram-ID': telegramId }
		})

		const data = (await res.json()) as GetGenerationResponse | GetGenerationError
		if (!res.ok || !data.success) {
			throw new Error((data as GetGenerationError).message || 'Unknown error')
		}
		return data as GetGenerationResponse
	}

	async uploadImage(file: File, telegramId: string): Promise<{ url: string; filename: string }> {
		const formData = new FormData()
		formData.append('image', file)

		const res = await fetch(
			'https://pipeline-frontend-cpz2ms32f-gsergiy13s-projects.vercel.app/api/images/upload',
			{
				method: 'POST',
				headers: {
					'X-Telegram-ID': telegramId
				},
				body: formData
			}
		)

		const data = (await res.json()) as ImageUploadResponse | ImageUploadError

		if (!res.ok || !data.success) throw new Error(data.message)

		return {
			url: data.url,
			filename: data.filename
		}
	}
}

export const generateT2VService = new GenerateT2VService()
