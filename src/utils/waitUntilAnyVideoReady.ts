import { generateT2VService } from 'services/gnerate-t2v.service'
import type { GenerationDetails } from 'types/IVideo.type'

const POLL_INTERVAL = 30000

export async function waitUntilAnyVideoReady(ids: string[]): Promise<GenerationDetails> {
	return new Promise((resolve, reject) => {
		const intervalIds: NodeJS.Timeout[] = []
		let resolved = false

		const checkStatus = async (id: string) => {
			try {
				const res = await generateT2VService.getGenerationInfo(id)
				const status = res.generation.status

				if (status === 'completed' && !resolved) {
					resolved = true
					intervalIds.forEach(clearInterval)
					resolve(res.generation)
				}
			} catch (err) {
				console.error(`Помилка перевірки статусу генерації ${id}:`, err)
			}
		}

		for (const id of ids) {
			checkStatus(id)
			const intervalId = setInterval(() => checkStatus(id), POLL_INTERVAL)
			intervalIds.push(intervalId)
		}
	})
}
