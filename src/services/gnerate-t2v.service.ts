import type { GetGenerationError, GetGenerationResponse, T2VResponse } from 'types/IVideo.type'

class GenerateT2VService {
	async postExploreVideos(): Promise<T2VResponse> {
		try {
			const response = await fetch('/api/generate/t2v', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					seedPrompt: 'Generate a video of a cat playing with a ball',
					model: 'seedance-v1-pro-480p',
					duration: 5,
					generationCount: 1,
					telegramId: '5621694270'
				})
			})

			if (!response.ok) {
				throw new Error('Failed to generate video')
			}

			const data: T2VResponse = await response.json()

			console.log('Повідомлення:', data.message)
			console.log('Статус:', data.status)

			const firstGenId = data.generations[0]?.generationId
			console.log('ID першої генерації:', firstGenId)

			return data
		} catch (error) {
			console.error('Помилка генерації відео:', error)
			throw error
		}
	}

	async getGenerationInfo(generationId: string): Promise<GetGenerationResponse> {
		try {
			const response = await fetch(`/api/generate/${generationId}`, {
				method: 'GET'
			})

			const data = (await response.json()) as GetGenerationResponse | GetGenerationError

			if (!response.ok || !data.success) {
				throw new Error((data as GetGenerationError).message || 'Unknown error')
			}

			return data as GetGenerationResponse
		} catch (error) {
			console.error('Помилка getGenerationInfo:', error)
			throw error
		}
	}
}

export const generateT2VService = new GenerateT2VService()
