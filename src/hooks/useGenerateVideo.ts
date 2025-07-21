import { usePrice } from 'hooks/usePrice'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { generateT2VService } from 'services/gnerate-t2v.service'
import {
	type SelectedParams,
	addVideosToCollection,
	clearVideoCollection
} from 'store/slices/generationSlice'
import { decreaseBalance } from 'store/slices/userSlice'
import type { T2VRequest } from 'types/IVideo.type'
import type { ModelConfigurationsItem } from 'types/ModelConfigurations.type'

interface Params {
	telegramId: string
	selectedModel: ModelConfigurationsItem | null
	selectedParams: SelectedParams
}

export const useGenerateVideo = ({ telegramId, selectedModel, selectedParams }: Params) => {
	const [prompt, setPrompt] = useState('')
	const [attachmentFilename, setAttachmentFilename] = useState<string | null>(null)

	const dispatch = useDispatch()
	const price = usePrice(selectedModel, selectedParams)

	const handleGenerate = useCallback(async () => {
		const text = prompt.trim()
		if (!selectedModel || !text) return

		const { quantity, duration, quality } = selectedParams
		const opts = selectedModel.options
		const isImageMode = Boolean(attachmentFilename)

		let modelType = selectedModel.type
		if (opts?.quality && quality) modelType += `-${quality}`

		dispatch(decreaseBalance(price))

		const base: Partial<T2VRequest> = { model: modelType }

		const payload: T2VRequest = isImageMode
			? {
					...base,
					pairs: [{ seedPrompt: text, imageUrl: attachmentFilename! }],
					...(opts?.duration && duration != null && { duration }),
					...(opts?.quality && quality != null && { quality })
				}
			: {
					...base,
					seedPrompt: text,
					...(opts?.quantity && quantity != null && { generationCount: quantity }),
					...(opts?.duration && duration != null && { duration })
				}

		try {
			dispatch(clearVideoCollection())

			const res = await generateT2VService.postExploreVideos(payload, telegramId, isImageMode)

			const ids = (
				isImageMode ? res.generations.map(g => g.id) : res.generations.map(g => g.generationId)
			).filter(Boolean)

			ids.length
				? dispatch(addVideosToCollection(ids))
				: toast.error('ID not found in response', toastStyle)
		} catch (err) {
			toast.error('Error during generation', toastStyle)
			console.error(err)
		} finally {
			setPrompt('')

			setAttachmentFilename(null)
		}
	}, [prompt, attachmentFilename, selectedModel, selectedParams, telegramId, price, dispatch])

	return {
		prompt,
		setPrompt,
		attachmentFilename,
		setAttachmentFilename,
		handleGenerate,
		price,
		disabled: !prompt.trim()
	}
}

const toastStyle = { style: { borderRadius: '10px', background: '#333', color: '#fff' } }
