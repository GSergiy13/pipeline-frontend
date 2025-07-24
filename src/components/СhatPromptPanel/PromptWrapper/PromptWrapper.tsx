'use client'

import { toastStyle } from 'constants/toast.const'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { generateT2VService } from 'services/generate.service'
import { setAttachmentFilename, setFocusInput } from 'store/slices/generationSlice'
import { persistor } from 'store/store'
import { handleVibrate } from 'utils/handleVibrate'

import { PromptAttachmentPreview } from '../PromptAttachmentPreview/PromptAttachmentPreview'
import { PromptSettingsRow } from '../PromptSettingsRow/PromptSettingsRow'

import { ExpandButton } from './ExpandInputButton/ExpandInputButton'
import { PromptInputField } from './PromptInputField/PromptInputField'

interface PromptWrapperProps {
	prompt: string
	setPrompt: (value: string) => void
	attachmentFilename?: string | null
}

export const PromptWrapper = ({ prompt, setPrompt, attachmentFilename }: PromptWrapperProps) => {
	const inputRef = useRef<{ toggleExpand: () => void }>(null)
	const [isExpanded, setIsExpanded] = useState(false)
	const dispatch = useDispatch()

	const handleExpand = () => {
		inputRef.current?.toggleExpand()
		setIsExpanded(prev => !prev)
		handleVibrate('light', 100)
	}

	const handleFocusState = (focused: boolean) => dispatch(setFocusInput(focused))

	const handleFileSelect = async (file: File) => {
		handleVibrate('light', 100)

		try {
			const { url } = await generateT2VService.uploadImage(file)

			dispatch(setAttachmentFilename(url))
		} catch (err) {
			toast.error(`❌ ${err}`, toastStyle)
		}
	}

	const handleRemoveAttachment = () => {
		dispatch(setAttachmentFilename(null))
		handleVibrate('light', 100)
	}

	return (
		<div className='relative flex flex-col gap-3 mt-auto w-full min-h-20 backdrop-blur-[30px] bg-dark-bg-transparency-8 rounded-[24px] p-2'>
			{/* <AddRowsCustom /> */}

			<div
				className=' absolute right-0 top-0 -translate-y-[150%] p-1 px-2 rounded-lg bg-[#232327] text-xs'
				onClick={async () => {
					await persistor.purge()
					window.location.reload()
				}}
			>
				Clear State
			</div>

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
				handleFocusState={handleFocusState}
			/>
			<ExpandButton
				onExpand={handleExpand}
				isExpanded={isExpanded}
			/>

			<PromptSettingsRow onFileSelect={handleFileSelect} />
		</div>
	)
}
