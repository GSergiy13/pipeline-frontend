import { toastStyle } from 'constants/toast.const'
import toast from 'react-hot-toast'
import { generateT2VService } from 'services/generate.service'
import { clearVideoCollection } from 'store/slices/generationSlice'
import type { AppDispatch } from 'store/store'
import type { GenerationDetails } from 'types/IVideo.type'

const POLL_FIRST_DELAY = 40000
const POLL_NEXT_DELAY = 30000

export function waitUntilAnyVideoReady(
	ids: string[],
	onReady: (id: string, generation: GenerationDetails) => void,
	dispatch?: AppDispatch
) {
	let cancelled = false
	const pendingQueue = [...ids]

	const processNext = async (isFirst = true) => {
		if (cancelled || !pendingQueue.length) return

		const id = pendingQueue[0]

		try {
			const res = await generateT2VService.getGenerationInfo(id)
			const generation = res.generation

			if (generation.status === 'completed') {
				onReady(id, generation)
				pendingQueue.shift()
				processNext(false)
				return
			}

			if (generation.status === 'failed') {
				toast.error(`⚠️ Генерація з ID ${id} завершилась з помилкою.`, toastStyle)
				dispatch?.(clearVideoCollection())
				cancelled = true
				return
			}
		} catch (err) {
			console.error(`❌ Помилка перевірки статусу ${id}`, err)
			toast.error(`❌ ${err}`, toastStyle)
			dispatch?.(clearVideoCollection())
			cancelled = true
			return
		}

		const delay = isFirst ? POLL_FIRST_DELAY : POLL_NEXT_DELAY
		setTimeout(() => processNext(false), delay)
	}

	processNext(true)

	return () => {
		cancelled = true
	}
}
