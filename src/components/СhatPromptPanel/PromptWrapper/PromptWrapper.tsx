'use client'

import { toastStyle } from 'constants/toast.const'
import { useRef } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { generateT2VService } from 'services/generate.service'
import { selectSelected, setSelected } from 'store/slices/controlPanelSlice'
import { persistor } from 'store/store'
import { handleVibrate } from 'utils/handleVibrate'

import { PromptAttachmentPreview } from '../PromptAttachmentPreview/PromptAttachmentPreview'
import { PromptSettingsRow } from '../PromptSettingsRow/PromptSettingsRow'

import { AddRowsCustom } from './AddRowsCustom/AddRowsCustom'
import { ExpandButton } from './ExpandInputButton/ExpandInputButton'
import { PromptInputField } from './PromptInputField/PromptInputField'

export const PromptWrapper = () => {
	const inputRef = useRef<{ toggleExpand: () => void }>(null)
	const dispatch = useDispatch()

	const attachmentFilename = useSelector(selectSelected).attachmentFilename

	const handleExpand = () => {
		inputRef.current?.toggleExpand()
		handleVibrate('light', 100)
	}

	const handleFileSelect = async (file: File) => {
		handleVibrate('light', 100)

		console.log('Selected file for upload:', file)

		try {
			const { url } = await generateT2VService.uploadImage(file)

			dispatch(setSelected({ key: 'attachmentFilename', value: url }))
		} catch (err) {
			toast.error(`❌ ${err}`, toastStyle)
		}
	}

	const handleRemoveAttachment = () => {
		dispatch(setSelected({ key: 'attachmentFilename', value: null }))
		handleVibrate('light', 100)
	}

	return (
		<div className='relative flex flex-col gap-3 mt-auto w-full min-h-20 backdrop-blur-[30px] bg-dark-bg-transparency-8 rounded-[24px] p-2'>
			<AddRowsCustom />

			<div
				className='absolute right-0 top-0 -translate-y-[150%] p-1 px-2 rounded-lg bg-[#232327] text-xs'
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

			<PromptInputField ref={inputRef} />

			<ExpandButton
				onExpand={handleExpand}
				isExpanded={false}
			/>

			<PromptSettingsRow onFileSelect={handleFileSelect} />
		</div>
	)
}
