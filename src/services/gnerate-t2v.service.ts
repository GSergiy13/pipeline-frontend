import axios from 'axios'
import type { T2VResponse } from 'types/IVideo.type'

class GenerateT2VService {
	async postExploreVideos(): Promise<T2VResponse> {
		try {
			const response = await axios.post<T2VResponse>(
				`${process.env.NEXT_PUBLIC_API_URL}/generate/t2v`,
				{
					seedPrompt: 'Generate a video of a cat playing with a ball',
					model: 'seedance-v1-pro-480p',
					duration: 5,
					generationCount: 1
				},
				{
					headers: {
						'Content-Type': 'application/json',
						'X-Telegram-ID': '1231241231'
					}
				}
			)

			const data = response.data

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
}

export const generateT2VService = new GenerateT2VService()
