'use client'

import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { generateT2VService } from 'services/gnerate.service'
import { handleVibrate } from 'utils/handleVibrate'

import { PromptAttachmentPreview } from '../PromptAttachmentPreview/PromptAttachmentPreview'
import { PromptSettingsRow } from '../PromptSettingsRow/PromptSettingsRow'

import { ExpandButton } from './ExpandInputButton/ExpandInputButton'
import { PromptInputField } from './PromptInputField/PromptInputField'

interface PromptWrapperProps {
	prompt: string

	setPrompt: (value: string) => void
	attachmentFilename: string | null
	setAttachmentFilename: (filename: string | null) => void
}

const toastStyle = { style: { borderRadius: '10px', background: '#333', color: '#fff' } }

export const PromptWrapper = ({
	prompt,
	setPrompt,
	attachmentFilename,
	setAttachmentFilename
}: PromptWrapperProps) => {
	const inputRef = useRef<{ toggleExpand: () => void }>(null)
	const [isExpanded, setIsExpanded] = useState(false)

	const handleExpand = () => {
		inputRef.current?.toggleExpand()
		setIsExpanded(prev => !prev)
		handleVibrate('light', 100)
	}

	const handleFileSelect = async (file: File) => {
		handleVibrate('light', 100)

		try {
			const { url } = await generateT2VService.uploadImage(file)

			setAttachmentFilename(url)
		} catch (err) {
			toast.error(`❌ ${err}`, toastStyle)
		}
	}

	const handleRemoveAttachment = () => {
		setAttachmentFilename(null)
		handleVibrate('light', 100)
	}

	return (
		<div className='relative flex flex-col gap-3 mt-auto w-full min-h-20 backdrop-blur-[30px] bg-dark-bg-transparency-8 rounded-[24px] p-2 '>
			{/* <div className='absolute top-0 left-0 right-0 flex flex-col gap-1 -translate-y-[160px]'>
				<div className='p-1  backdrop-blur-[30px] bg-dark-bg-transparency-8 rounded-[24px] '>
					<input
						type='text'
						placeholder='Введите заголовок'
						className='w-full p-2 bg-transparent text-white placeholder:text-gray-400 rounded focus:outline-none'
					/>
				</div>
				<div className='p-1 backdrop-blur-[30px] min-h-[90px] bg-dark-bg-transparency-8 rounded-[24px] '>
					<textarea
						placeholder='Введите заголовок'
						className='w-full h-full p-2 bg-transparent text-white placeholder:text-gray-400 rounded focus:outline-none'
					></textarea>
				</div>
			</div> */}

			{attachmentFilename && (
				<PromptAttachmentPreview
					url={attachmentFilename}
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
