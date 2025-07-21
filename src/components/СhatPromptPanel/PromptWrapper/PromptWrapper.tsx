'use client'

import { useRef, useState } from 'react'
import { generateT2VService } from 'services/gnerate-t2v.service'
import { handleVibrate } from 'utils/handleVibrate'

import { PromptAttachmentPreview } from '../PromptAttachmentPreview/PromptAttachmentPreview'
import { PromptSettingsRow } from '../PromptSettingsRow/PromptSettingsRow'

import { ExpandButton } from './ExpandInputButton/ExpandInputButton'
import { PromptInputField } from './PromptInputField/PromptInputField'

interface PromptWrapperProps {
	prompt: string
	telegramId: string
	setPrompt: (value: string) => void
	setAttachmentFilename: (filename: string | null) => void
}

export const PromptWrapper = ({
	prompt,
	setPrompt,
	telegramId,
	setAttachmentFilename
}: PromptWrapperProps) => {
	const inputRef = useRef<{ toggleExpand: () => void }>(null)
	const [isExpanded, setIsExpanded] = useState(false)
	const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null)

	const handleExpand = () => {
		inputRef.current?.toggleExpand()
		setIsExpanded(prev => !prev)
		handleVibrate('light', 100)
	}

	const handleFileSelect = async (file: File) => {
		handleVibrate('light', 100)
		if (!telegramId) return console.warn('Missing telegramId')

		try {
			const { url, filename } = await generateT2VService.uploadImage(file, telegramId)
			setAttachmentUrl(url)
			setAttachmentFilename(url)
		} catch (err) {
			console.error('Upload failed:', err)
		}
	}

	const handleRemoveAttachment = () => {
		setAttachmentUrl(null)
		setAttachmentFilename(null)
		handleVibrate('light', 100)
	}

	return (
		<div className='relative flex flex-col gap-2 mt-auto w-full min-h-20 backdrop-blur-[30px] bg-dark-bg-transparency-8 rounded-[24px] p-2'>
			{attachmentUrl && (
				<PromptAttachmentPreview
					url={attachmentUrl}
					onRemove={handleRemoveAttachment}
				/>
			)}
			<PromptInputField
				ref={inputRef}
				value={prompt}
				onChange={setPrompt}
			/>
			<ExpandButton
				onExpand={handleExpand}
				isExpanded={isExpanded}
			/>
			<PromptSettingsRow onFileSelect={handleFileSelect} />
		</div>
	)
}
