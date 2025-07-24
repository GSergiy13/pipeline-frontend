'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Spinner } from '@/ui/Spinner/Spinner'

interface PromptAttachmentPreviewProps {
	url: string
	onRemove: () => void
}

export const PromptAttachmentPreview = ({ url, onRemove }: PromptAttachmentPreviewProps) => {
	const [isLoading, setIsLoading] = useState(true)

	if (!url) return null

	return (
		<div className='relative overflow-hidden rounded-xl w-[60px] h-[60px]'>
			{isLoading && (
				<div className='absolute inset-0 z-10 flex items-center justify-center bg-black/10'>
					<Spinner size={10} />
				</div>
			)}

			<img
				src={url}
				alt='Attachment Preview'
				className='max-h-32 max-w-full rounded-lg object-contain'
				onLoad={() => setIsLoading(false)}
				onError={() => setIsLoading(false)}
			/>
			<button
				onClick={onRemove}
				className='absolute top-1 right-1 rounded-full z-20'
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
