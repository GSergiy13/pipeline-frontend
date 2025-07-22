import { usePrice } from 'hooks/usePrice'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { generateT2VService } from 'services/gnerate.service'
import {
	type SelectedParams,
	addVideosToCollection,
	clearAllVideoLoading,
	clearSeed,
	clearVideoCollection,
	setVideoLoading
} from 'store/slices/generationSlice'
import { decreaseBalance } from 'store/slices/userSlice'
import type { T2ARequest, T2VRequest } from 'types/IVideo.type'
import type { ModelConfigurationsItem, OptionGroup } from 'types/ModelConfigurations.type'

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

		const { quantity, duration, quality, seed, model, instrumental, custom_model } = selectedParams

		const opts = selectedModel.options
		const isImageMode = Boolean(attachmentFilename)
		const isAudioMode = selectedModel.type_generation === 'text-audio'

		let modelType = selectedModel.type
		if (opts?.quality && quality) modelType += `-${quality}`

		dispatch(decreaseBalance(price))
		dispatch(clearVideoCollection())
		dispatch(clearSeed())
		dispatch(clearAllVideoLoading())

		try {
			if (isAudioMode) {
				const resolvedAudioModel =
					(model as OptionGroup<string> | null | undefined)?.options?.[0]?.value ?? undefined

				const audioPayload: T2ARequest = {
					seedPrompt: text,
					model: resolvedAudioModel,
					customMode: custom_model,
					instrumental,
					...(custom_model && {
						style: quality || 'Default',
						title: text.slice(0, 40),

						negativeTags: ['rock', 'heavy metal']
					})
				}

				const res = await generateT2VService.postAudioGeneration(audioPayload, telegramId)

				const ids = res.generations?.map(g => g.generationId)?.filter(Boolean)

				if (ids?.length) {
					ids.forEach(id => dispatch(setVideoLoading({ videoId: id, isLoading: true })))
					dispatch(addVideosToCollection(ids))
				} else {
					toast.error('ID not found in audio response', toastStyle)
				}
			} else {
				const base: Partial<T2VRequest> = { model: modelType }

				const payload: T2VRequest = isImageMode
					? {
							...base,
							pairs: [{ seedPrompt: text, imageUrl: attachmentFilename! }],
							...(opts?.duration && duration != null && { duration }),
							...(opts?.quality && quality != null && { quality }),
							...(seed != null && { seed })
						}
					: {
							...base,
							seedPrompt: text,
							...(opts?.quantity && quantity != null && { generationCount: quantity }),
							...(opts?.duration && duration != null && { duration }),
							...(seed != null && { seed })
						}

				const res = await generateT2VService.postExploreVideos(payload, telegramId, isImageMode)

				const ids = (
					isImageMode ? res.generations.map(g => g.id) : res.generations.map(g => g.generationId)
				).filter(Boolean)

				if (ids.length) {
					ids.forEach(id => dispatch(setVideoLoading({ videoId: id, isLoading: true })))
					dispatch(addVideosToCollection(ids))
				} else {
					toast.error('ID not found in response', toastStyle)
				}
			}
		} catch (err) {
			toast.error(`❌ ${err}`, toastStyle)
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
