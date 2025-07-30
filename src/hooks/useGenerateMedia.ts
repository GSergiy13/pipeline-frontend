import { toastStyle } from 'constants/toast.const'
import { usePrice } from 'hooks/usePrice'
import { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { generateT2VService } from 'services/generate.service'
import type { ControlPanelState } from 'store/slices/controlPanelSlice'
import { setSelected } from 'store/slices/controlPanelSlice'
import { clearAllProgress, upsertStatus } from 'store/slices/generationProgressSlice'
import { decreaseBalance } from 'store/slices/userSlice'
import type { I2IRequest, T2ARequest, T2VRequest } from 'types/IVideo.type'
import type { ModelConfigurationsItem } from 'types/ModelConfigurations.type'

interface Params {
	selectedModel: ModelConfigurationsItem | null
	selectedParams: ControlPanelState['selected']
	attachmentFilename?: string | null
}

export const useGenerateMedia = ({ selectedModel, selectedParams, attachmentFilename }: Params) => {
	const prompt = selectedParams.prompt
	const [isSubmitting, setIsSubmitting] = useState(false)
	const dispatch = useDispatch()

	const price = usePrice(selectedModel, selectedParams)

	const disabled = useMemo(
		() => !prompt.trim() || !selectedModel || isSubmitting,
		[prompt, selectedModel, isSubmitting]
	)

	const resetInputs = useCallback(() => {
		dispatch(setSelected({ key: 'attachmentFilename', value: null }))
		dispatch(setSelected({ key: 'prompt', value: '' }))
		dispatch(setSelected({ key: 'titleAudio', value: '' }))
		dispatch(setSelected({ key: 'lyricsAudio', value: '' }))
	}, [dispatch])

	const setLoadingForIds = useCallback(
		(ids: string[]) => {
			ids.forEach(id =>
				dispatch(
					upsertStatus({
						id,
						isLoading: true,
						isComplete: false
					})
				)
			)
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
			customModel,
			titleAudio,
			lyricsAudio
		} = selectedParams

		const opts = selectedModel.options
		const isImgMode = selectedModel.type_generation === 'img-to-img'
		const isAudioMode = selectedModel.type_generation === 'text-audio'
		const withImage = Boolean(attachmentFilename)

		let modelType = selectedModel.type
		if (opts?.quality && quality) modelType += `-${quality}p`

		dispatch(clearAllProgress())
		dispatch(setSelected({ key: 'seed', value: null }))

		setIsSubmitting(true)

		try {
			if (isAudioMode) {
				const audioPayload: T2ARequest = {
					model: audioModel || undefined,
					customMode: customModel,
					instrumental,
					...(!customModel && {
						seedPrompt: text
					}),
					...(customModel &&
						instrumental && {
							style: text,
							title: titleAudio
						}),
					...(customModel &&
						!instrumental && {
							seedPrompt: lyricsAudio || 'Default',
							style: text,
							title: titleAudio
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
			dispatch(clearAllProgress())
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
		handleGenerate,
		price,
		disabled,
		isSubmitting
	}
}
