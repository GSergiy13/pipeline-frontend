'use client'

import { useGenerateMedia } from 'hooks/useGenerateMedia'
import { useSelectedModel } from 'hooks/useSelectedModel'
import { type Ref, forwardRef, memo } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { selectSelected } from 'store/slices/controlPanelSlice'
import { progressSelectors } from 'store/slices/generationProgressSlice'

import { PromptGenerateButton } from './PromptGenerateButton/PromptGenerateButton'
import { PromptWrapper } from './PromptWrapper/PromptWrapper'

const ChatPromptPanelInner = (_: unknown, ref: Ref<HTMLDivElement>) => {
	const selectedModel = useSelectedModel()
	const selectedParams = useSelector(selectSelected, shallowEqual)
	const videoStatusMap = useSelector(progressSelectors.selectEntities, shallowEqual)

	const attachmentFilename = selectedParams.attachmentFilename

	const { handleGenerate, price, disabled } = useGenerateMedia({
		selectedModel,
		selectedParams,
		attachmentFilename
	})

	const allDone =
		videoStatusMap && typeof videoStatusMap === 'object'
			? Object.values(videoStatusMap).every(v => v?.isLoading === false)
			: true

	return (
		<div
			ref={ref}
			className='absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col mt-auto w-full z-40 transition-all duration-150 max-w-[640px] mx-auto px-3'
		>
			<PromptWrapper />

			<PromptGenerateButton
				handleGenerate={handleGenerate}
				disabled={disabled}
				price={price}
				isLoading={allDone}
			/>
		</div>
	)
}

export const ChatPromptPanel = memo(forwardRef(ChatPromptPanelInner))
