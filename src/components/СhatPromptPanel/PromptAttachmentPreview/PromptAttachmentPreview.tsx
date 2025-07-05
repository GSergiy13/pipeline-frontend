import Image from 'next/image'
import { useEffect, useState } from 'react'

interface PromptAttachmentPreviewProps {
	file: File
	onRemove: () => void
}

export const PromptAttachmentPreview = ({ file, onRemove }: PromptAttachmentPreviewProps) => {
	const [preview, setPreview] = useState<string | null>(null)

	useEffect(() => {
		const reader = new FileReader()
		reader.onload = () => {
			setPreview(reader.result as string)
		}
		reader.readAsDataURL(file)

		return () => {
			reader.abort()
		}
	}, [file])

	if (!preview) return null

	return (
		<div className='relative overflow-hidden rounded-xl w-[60px] h-[60px]'>
			<img
				src={preview}
				alt='Preview'
				className='max-h-32 max-w-full rounded-lg object-contain'
			/>

			<button
				onClick={onRemove}
				className='absolute top-1 right-1 rounded-full'
			>
				<Image
					src='/icons/remove.svg'
					alt='Remove Attachment'
					width={16}
					height={16}
				/>
			</button>
		</div>
	)
}
