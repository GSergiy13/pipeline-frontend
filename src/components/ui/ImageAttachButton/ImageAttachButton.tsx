'use client'

import { toastStyle } from 'constants/toast.const'
import Image from 'next/image'
import { memo, useCallback, useRef } from 'react'
import toast from 'react-hot-toast'

const allowedExtensions = ['jpg', 'jpeg', 'png'] as const

interface Props {
	onSelect: (file: File) => void
	className?: string
	accept?: string
}

export const ImageAttachButton = memo(
	({ onSelect, className, accept = '.jpg,.jpeg,.png' }: Props) => {
		const inputRef = useRef<HTMLInputElement>(null)

		const openDialog = useCallback(() => inputRef.current?.click(), [])

		const handleChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				const file = e.target.files?.[0]
				if (!file) return

				const ext = file.name.split('.').pop()?.toLowerCase()
				if (!ext || !allowedExtensions.includes(ext as (typeof allowedExtensions)[number])) {
					toast.error('❌ Непідтримуваний формат. JPG, JPEG або PNG.', toastStyle)
					return
				}
				onSelect(file)
			},
			[onSelect]
		)

		return (
			<>
				<button
					onClick={openDialog}
					className={
						className ??
						'flex items-center justify-center w-[30px] h-[30px] rounded-full border border-dark-bg-transparency-12 bg-dark-bg-transparency-4 hover:bg-dark-bg-transparency-8 transition-colors duration-200'
					}
					aria-label='Attach image'
					type='button'
				>
					<Image
						src='/icons/attach.svg'
						alt='Attach Icon'
						width={16}
						height={16}
					/>
				</button>

				<input
					ref={inputRef}
					type='file'
					accept={accept}
					className='hidden'
					onChange={handleChange}
				/>
			</>
		)
	}
)
