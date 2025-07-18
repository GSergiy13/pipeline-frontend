import { useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from 'store/store'

import { PromptGenerateButton } from './PromptGenerateButton/PromptGenerateButton'
import { PromptWrapper } from './PromptWrapper/PromptWrapper'

export const ChatPromptPanel = () => {
	const [prompt, setPrompt] = useState('')
	const generation = useSelector((state: RootState) => state.generation)
	const { selectedModel, selectedParams } = generation

	const telegramId = useSelector((state: RootState) => state.user.user?.tg_data?.id)

	const handleGenerate = () => {
		if (!selectedModel || !prompt.trim()) {
			console.warn('Missing data to generate')

			return
		}

		const payload = {
			model: selectedModel.type,
			quantity: selectedParams.quantity,
			duration: selectedParams.duration,
			quality: selectedParams.quality,
			prompt: prompt.trim(),
			image: selectedParams.image || null,
			telegramId: telegramId || 'user_id'
		}

		console.log('Send to backend:', payload)
	}

	return (
		<div className=' flex flex-col mt-auto w-full z-40 transition-all duration-150 max-w-[640px] mx-auto px-3'>
			{/* <UserInfoPanel /> */}
			<PromptWrapper
				prompt={prompt}
				setPrompt={setPrompt}
			/>
			<PromptGenerateButton
				handleGenerate={() => handleGenerate()}
				disabled={!prompt.trim()}
			/>
		</div>
	)
}
