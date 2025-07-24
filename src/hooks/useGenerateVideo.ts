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
import type { ModelConfigurationsItem } from 'types/ModelConfigurations.type'

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

		const {
			quantity,
			duration,
			quality,
			seed,
			aspectRatio,
			model,
			audioModel,
			instrumental,
			custom_model
		} = selectedParams

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
				const audioPayload: T2ARequest = {
					seedPrompt: text,
					// model: audioModel,
					...(audioModel && { model: audioModel }),
					customMode: custom_model,
					instrumental,
					...(custom_model && {
						style: quality || 'Default',
						title: text.slice(0, 40),
						negativeTags: ['rock', 'heavy metal']
					})
				}

				console.log('Payload for Text to Audio generation:', audioPayload, modelType)

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
					toast.error("Изображение обв'язкове для генерации", toastStyle)
					return
				}

				const payload: I2IRequest = {
					model: modelType,
					seedPrompt: text,
					imageUrl: attachmentFilename!,
					...(quantity && { numImages: quantity }),
					...(aspectRatio && { aspectRatio }),
					...(seed && { seed })
				}

				console.log('Payload for ImgToImg generation:', payload)

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
							...(seed && { seed }),
							...(opts?.duration && duration != null && { duration })
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
