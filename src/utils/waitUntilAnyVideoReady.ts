import { generateT2VService } from 'services/gnerate-t2v.service'
import type { GenerationDetails } from 'types/IVideo.type'

const POLL_INTERVAL = 30000

export function waitUntilAnyVideoReady(
	ids: string[],
	tg_id: number | string,
	onReady: (id: string, generation: GenerationDetails) => void
) {
	let cancelled = false
	const checkedSet = new Set<string>()

	const check = async () => {
		if (cancelled) return

		const pendingIds = ids.filter(id => !checkedSet.has(id))
		if (!pendingIds.length) return

		const results = await Promise.all(
			pendingIds.map(async id => {
				try {
					const res = await generateT2VService.getGenerationInfo(id, tg_id.toString())
					return { id, generation: res.generation }
				} catch (err) {
					console.error(`❌ Помилка перевірки статусу ${id}:`, err)
					return null
				}
			})
		)

		for (const result of results) {
			if (!result) continue
			const { id, generation } = result
			if (generation.status === 'completed') {
				checkedSet.add(id)
				onReady(id, generation)
			}
		}

		setTimeout(check, POLL_INTERVAL)
	}

	check()

	return () => {
		cancelled = true
	}
}
