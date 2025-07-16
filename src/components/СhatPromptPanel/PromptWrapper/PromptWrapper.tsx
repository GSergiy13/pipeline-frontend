import { useRef, useState } from 'react'
import { handleVibrate } from 'utils/handleVibrate'

import { PromptAttachmentPreview } from '../PromptAttachmentPreview/PromptAttachmentPreview'
import { PromptSettingsRow } from '../PromptSettingsRow/PromptSettingsRow'

import { ExpandButton } from './ExpandInputButton/ExpandInputButton'
import { PromptInputField } from './PromptInputField/PromptInputField'

export const PromptWrapper = () => {
	const inputRef = useRef<{ toggleExpand: () => void }>(null)
	const [isExpanded, setIsExpanded] = useState(false)
	const [attachment, setAttachment] = useState<File | null>(null)

	const handleExpand = () => {
		inputRef.current?.toggleExpand()
		setIsExpanded(prev => !prev)
		handleVibrate('light', 100)
	}

	const handleFileSelect = (file: File) => {
		setAttachment(file)
		handleVibrate('light', 100)
	}

	const handleRemoveAttachment = () => {
		setAttachment(null)
		handleVibrate('light', 100)
	}

	return (
		<div className='relative flex flex-col gap-2 mt-auto w-full min-h-20 backdrop-blur-[30px] bg-dark-bg-transparency-8 rounded-[24px] p-2'>
			{attachment && (
				<PromptAttachmentPreview
					file={attachment}
					onRemove={handleRemoveAttachment}
				/>
			)}
			<PromptInputField ref={inputRef} />
			<ExpandButton
				onExpand={handleExpand}
				isExpanded={isExpanded}
			/>
			<PromptSettingsRow onFileSelect={handleFileSelect} />
		</div>
	)
}
