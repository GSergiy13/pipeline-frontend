'use client'

import { forwardRef, useState } from 'react'
import toast from 'react-hot-toast'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { generateT2VService } from 'services/gnerate-t2v.service'
import { addVideosToCollection, clearVideoCollection } from 'store/slices/generationSlice'
import { decreaseBalance } from 'store/slices/userSlice'
import type { RootState } from 'store/store'
import type { T2VRequest, T2VResponse } from 'types/IVideo.type'

import { PromptGenerateButton } from './PromptGenerateButton/PromptGenerateButton'
import { PromptWrapper } from './PromptWrapper/PromptWrapper'

export const ChatPromptPanel = forwardRef<HTMLDivElement>((props, ref) => {
	const [prompt, setPrompt] = useState('')

	const { user, generation } = useSelector(
		(state: RootState) => ({
			user: state.user,
			generation: state.generation
		}),
		shallowEqual
	)

	const { selectedModel, selectedParams } = generation
	const dispatch = useDispatch()

	const opts = selectedModel?.options
	let finalPrice = selectedModel?.price || 0
	if (opts?.quantity && selectedParams.quantity) {
		finalPrice *= selectedParams.quantity
	}

	const handleGenerate = async () => {
		if (!selectedModel || !prompt.trim()) {
			console.warn('Missing data to generate')
			return
		}

		const { quantity, duration, quality, image } = selectedParams
		const isImageMode = !!image
		const telegramId = String(user.user?.tg_data?.id || '5621694270')

		try {
			let modelType = selectedModel.type
			if (opts?.quality && quality) {
				modelType += `-${quality}`
			}

			dispatch(decreaseBalance(finalPrice))

			const payload: T2VRequest = {
				seedPrompt: prompt.trim(),
				model: modelType
			}

			if (opts?.quantity && quantity != null) payload.generationCount = quantity
			if (opts?.duration && duration != null) payload.duration = duration

			if (isImageMode) {
				console.log('Image mode is not implemented yet')
			}

			dispatch(clearVideoCollection())
			setPrompt('')

			const response = (await generateT2VService.postExploreVideos(
				payload,
				telegramId
			)) as T2VResponse
			const ids = response.generations.map(g => g.generationId)

			if (ids.length) {
				dispatch(addVideosToCollection(ids))
				console.log('ID генерацій додано:', ids)
			} else {
				toast.error('ID not found in response', {
					style: { borderRadius: '10px', background: '#333', color: '#fff' }
				})
			}
		} catch (e) {
			toast.error('Error during generation', {
				style: { borderRadius: '10px', background: '#333', color: '#fff' }
			})
			console.error(e)
		}
	}

	return (
		<div
			ref={ref}
			className='absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col mt-auto w-full z-40 transition-all duration-150 max-w-[640px] mx-auto px-3'
		>
			<PromptWrapper
				prompt={prompt}
				setPrompt={setPrompt}
			/>
			<PromptGenerateButton
				handleGenerate={handleGenerate}
				disabled={!prompt.trim()}
				price={finalPrice}
			/>
		</div>
	)
})
