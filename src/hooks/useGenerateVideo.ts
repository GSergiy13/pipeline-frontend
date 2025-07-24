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
import type { I2IRequest, T2ARequest, T2VRequest } from 'types/IVideo.type'
import type { ModelConfigurationsItem, OptionGroup } from 'types/ModelConfigurations.type'

interface Params {
	selectedModel: ModelConfigurationsItem | null
	selectedParams: SelectedParams
}
export const useGenerateVideo = ({ selectedModel, selectedParams }: Params) => {
	const [prompt, setPrompt] = useState('')
	const [attachmentFilename, setAttachmentFilename] = useState<string | null>(null)

	const dispatch = useDispatch()
	const price = usePrice(selectedModel, selectedParams)

	const handleGenerate = useCallback(async () => {
		const text = prompt.trim()
		if (!selectedModel || !text) return

		const { quantity, duration, quality, seed, aspectRatio, model, instrumental, custom_model } =
			selectedParams

		const opts = selectedModel.options
		const isImageMode = Boolean(attachmentFilename)

		let modelType = selectedModel.type
		if (opts?.quality && quality) modelType += `-${quality}p`

		dispatch(decreaseBalance(price))
		dispatch(clearVideoCollection())
		dispatch(clearAllVideoLoading())
		dispatch(clearSeed())

		try {
			if (selectedModel.type_generation === 'text-audio') {
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

				const res = await generateT2VService.postAudioGeneration(audioPayload)
				const ids = res.generations?.map(g => g.generationId)?.filter(Boolean)

				if (ids?.length) {
					ids.forEach(id => dispatch(setVideoLoading({ videoId: id, isLoading: true })))
					dispatch(addVideosToCollection(ids))
				} else {
					toast.error('ID not found in audio response', toastStyle)
				}
			} else if (selectedModel.type_generation === 'img-to-img') {
				if (!attachmentFilename) {
					toast.error('Attachment filename is required for ImgToImg generation', toastStyle)
					return
				}

				const payload: I2IRequest = {
					model: modelType,
					seedPrompt: text,
					imageUrl: attachmentFilename!,
					numImages: quantity || 1,
					aspectRatio: aspectRatio || '1:1',
					seed: seed || undefined
				}

				const res = await generateT2VService.postImageToImage(payload)
				const ids = res.generations?.map(g => g.id)?.filter(Boolean)

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
							seed: seed || undefined,
							duration: duration || undefined
						}
					: {
							...base,
							seedPrompt: text,
							...(opts?.quantity && quantity != null && { generationCount: quantity }),
							...(opts?.duration && duration != null && { duration }),
							...(seed != null && { seed })
						}

				console.log('Payload for video generation:', payload)

				const res = await generateT2VService.postExploreVideos(payload, isImageMode)

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
			dispatch(clearVideoCollection())
		} finally {
			setPrompt('')
			setAttachmentFilename(null)
		}
	}, [prompt, attachmentFilename, selectedModel, selectedParams, price, dispatch])

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
