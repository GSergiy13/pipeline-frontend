import type {
	GetGenerationError,
	GetGenerationResponse,
	T2VRequest,
	T2VResponse
} from 'types/IVideo.type'

class GenerateT2VService {
	async postExploreVideos(payload: T2VRequest, telegramId: string): Promise<T2VResponse> {
		console.log(
			'Sending request to generate T2V with payload:',
			payload,
			'and Telegram ID:',
			telegramId
		)
		const res = await fetch('/api/generate/t2v', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Telegram-ID': telegramId
			},
			body: JSON.stringify(payload)
		})

		if (!res.ok) throw new Error('Failed to generate video')
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
}

export const generateT2VService = new GenerateT2VService()
