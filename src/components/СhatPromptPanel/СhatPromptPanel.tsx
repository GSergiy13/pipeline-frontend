'use client'

import { useGenerateVideo } from 'hooks/useGenerateVideo'
import { type Ref, forwardRef, memo } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import type { RootState } from 'store/store'

import { PromptGenerateButton } from './PromptGenerateButton/PromptGenerateButton'
import { PromptWrapper } from './PromptWrapper/PromptWrapper'

const useGenerationContext = () =>
	useSelector(
		(s: RootState) => ({
			telegramId: String(s.user.user?.tg_data?.id),
			selectedModel: s.generation.selectedModel,
			selectedParams: s.generation.selectedParams
		}),
		shallowEqual
	)

const ChatPromptPanelInner = (_: unknown, ref: Ref<HTMLDivElement>) => {
	const { telegramId, selectedModel, selectedParams } = useGenerationContext()

	const {
		prompt,
		setPrompt,
		attachmentFilename,
		setAttachmentFilename,
		handleGenerate,
		price,
		disabled
	} = useGenerateVideo({ telegramId, selectedModel, selectedParams })

	return (
		<div
			ref={ref}
			className='absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col mt-auto w-full z-40 transition-all duration-150 max-w-[640px] mx-auto px-3'
		>
			<PromptWrapper
				prompt={prompt}
				telegramId={telegramId}
				setPrompt={setPrompt}
				attachmentFilename={attachmentFilename}
				setAttachmentFilename={setAttachmentFilename}
			/>

			<PromptGenerateButton
				handleGenerate={handleGenerate}
				disabled={disabled}
				price={price}
			/>
		</div>
	)
}

export const ChatPromptPanel = memo(forwardRef(ChatPromptPanelInner))
