import Image from 'next/image'

interface PromptAttachmentPreviewProps {
	url: string
	onRemove: () => void
}

export const PromptAttachmentPreview = ({ url, onRemove }: PromptAttachmentPreviewProps) => {
	if (!url) return null

	return (
		<div className='relative overflow-hidden rounded-xl w-[60px] h-[60px]'>
			<img
				src={url}
				alt='Attachment Preview'
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
