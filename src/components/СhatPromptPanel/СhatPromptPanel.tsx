import { forwardRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { generateT2VService } from 'services/gnerate-t2v.service'
import type { RootState } from 'store/store'

import { PromptGenerateButton } from './PromptGenerateButton/PromptGenerateButton'
import { PromptWrapper } from './PromptWrapper/PromptWrapper'

export const ChatPromptPanel = forwardRef<HTMLDivElement>((props, ref) => {
	const [prompt, setPrompt] = useState('')
	const generation = useSelector((state: RootState) => state.generation)
	const { selectedModel, selectedParams } = generation

	const telegramId = useSelector((state: RootState) => state.user.user?.tg_data?.id)

	const handleGenerate = async () => {
		// if (!selectedModel || !prompt.trim()) {
		// 	console.warn('Missing data to generate')
		// 	return
		// }
		// const payload = {
		// 	model: selectedModel.type,
		// 	quantity: selectedParams.quantity,
		// 	duration: selectedParams.duration,
		// 	quality: selectedParams.quality,
		// 	prompt: prompt.trim(),
		// 	image: selectedParams.image || null,
		// 	telegramId: telegramId || 'user_id'
		// }
		// console.log('Send to backend:', payload)

		try {
			const response = await generateT2VService.postExploreVideos()
			console.log('Генерація надіслана:', response)

			const generationId = response.generations[0]?.generationId
			console.log('ID генерації:', generationId)

			// Можна тут зберегти ID в Redux або почати polling
		} catch (error) {
			console.error('Помилка при генерації:', error)
		}
	}

	return (
		<div
			ref={ref}
			className=' absolute bottom-0 left-0 flex flex-col mt-auto w-full z-40 transition-all duration-150 max-w-[640px] mx-auto px-3'
		>
			<PromptWrapper
				prompt={prompt}
				setPrompt={setPrompt}
			/>
			<PromptGenerateButton
				handleGenerate={handleGenerate}
				disabled={!prompt.trim()}
			/>
		</div>
	)
})
