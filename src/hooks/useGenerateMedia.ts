import { toastStyle } from 'constants/toast.const'
import { usePrice } from 'hooks/usePrice'
import { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { generateT2VService } from 'services/generate.service'
import {
	type SelectedParams,
	addVideosToCollection,
	clearAllVideoLoading,
	clearSeed,
	clearVideoCollection,
	setAttachmentFilename,
	setVideoLoading
} from 'store/slices/generationSlice'
import { decreaseBalance } from 'store/slices/userSlice'
import type { I2IRequest, T2ARequest, T2VRequest } from 'types/IVideo.type'
import type { ModelConfigurationsItem } from 'types/ModelConfigurations.type'

interface Params {
	selectedModel: ModelConfigurationsItem | null
	selectedParams: SelectedParams
	attachmentFilename?: string | null
}

export const useGenerateMedia = ({ selectedModel, selectedParams, attachmentFilename }: Params) => {
	const [prompt, setPrompt] = useState('')

	const [isSubmitting, setIsSubmitting] = useState(false)

	const dispatch = useDispatch()
	const price = usePrice(selectedModel, selectedParams)

	const disabled = useMemo(
		() => !prompt.trim() || !selectedModel || isSubmitting,
		[prompt, selectedModel, isSubmitting]
	)

	const resetInputs = useCallback(() => {
		setPrompt('')
		dispatch(setAttachmentFilename(null))
	}, [])

	const setLoadingForIds = useCallback(
		(ids: string[]) => {
			ids.forEach(id => dispatch(setVideoLoading({ videoId: id, isLoading: true })))
			dispatch(addVideosToCollection(ids))
		},
		[dispatch]
	)

	const extractIds = (arr: any[] | undefined, key: 'id' | 'generationId') =>
		(arr ?? []).map(g => g?.[key]).filter(Boolean) as string[]

	const handleGenerate = useCallback(async () => {
		const text = prompt.trim()
		if (!selectedModel || !text) return

		const {
			quantity,
			duration,
			quality,
			seed,
			aspectRatio,
			audioModel,
			instrumental,
			custom_model
		} = selectedParams

		const opts = selectedModel.options
		const isImgMode = selectedModel.type_generation === 'img-to-img'
		const isAudioMode = selectedModel.type_generation === 'text-audio'
		const withImage = Boolean(attachmentFilename)

		let modelType = selectedModel.type
		if (opts?.quality && quality) modelType += `-${quality}p`

		dispatch(clearVideoCollection())
		dispatch(clearAllVideoLoading())
		dispatch(clearSeed())

		setIsSubmitting(true)

		try {
			if (isAudioMode) {
				const audioPayload: T2ARequest = {
					seedPrompt: text,
					...(audioModel && { model: audioModel }),
					customMode: custom_model,
					instrumental,
					...(custom_model && {
						style: quality || 'Default',
						title: text.slice(0, 40),
						negativeTags: ['rock', 'heavy metal']
					})
				}

				const res = await generateT2VService.postAudioGeneration(audioPayload)
				const ids = extractIds(res.generations, 'generationId')
				dispatch(decreaseBalance(price))

				if (ids.length) setLoadingForIds(ids)
				else toast.error('ID not found in audio response.', toastStyle)

				console.log('Audio generation payload:', audioPayload)

				return
			}

			if (isImgMode) {
				if (!attachmentFilename) {
					toast.error("Зображення обов'язкове для генерації.", toastStyle)
					return
				}

				const payload: I2IRequest = {
					model: modelType,
					seedPrompt: text,
					imageUrl: attachmentFilename,
					...(quantity && { numImages: quantity }),
					...(aspectRatio && { aspectRatio }),
					...(seed && { seed })
				}

				console.log('Image generation payload:', payload)

				const res = await generateT2VService.postImageToImage(payload)
				const ids = extractIds(res.generations, 'id')
				dispatch(decreaseBalance(price))

				if (ids.length) setLoadingForIds(ids)
				else toast.error('ID not found in image response.', toastStyle)

				return
			}

			const base: Partial<T2VRequest> = { model: modelType }

			const payload: T2VRequest = withImage
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

			const res = await generateT2VService.postExploreVideos(payload, withImage)
			const ids = extractIds(res.generations, withImage ? 'id' : 'generationId')
			dispatch(decreaseBalance(price))

			if (ids.length) setLoadingForIds(ids)
			else toast.error('ID not found in video response.', toastStyle)
			console.log('Video generation payload:', payload)
		} catch (err: any) {
			toast.error(`❌ ${err?.message || err}`, toastStyle)
			dispatch(clearVideoCollection())
		} finally {
			setIsSubmitting(false)
			resetInputs()
		}
	}, [
		prompt,
		selectedModel,
		selectedParams,
		price,
		dispatch,
		attachmentFilename,
		resetInputs,
		setLoadingForIds
	])

	return {
		prompt,
		setPrompt,
		handleGenerate,
		price,
		disabled,
		isSubmitting
	}
}
