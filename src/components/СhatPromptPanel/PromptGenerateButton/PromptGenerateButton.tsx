import Image from 'next/image'
import { useState } from 'react'
import { handleVibrate } from 'utils/handleVibrate'

interface PromptGenerateButtonProps {
	handleGenerate: () => void
	disabled?: boolean
	price?: number
}

export const PromptGenerateButton = ({
	handleGenerate,
	disabled,
	price
}: PromptGenerateButtonProps) => {
	const [isLoading, setIsLoading] = useState(false)

	const handleClick = () => {
		setIsLoading(true)
		handleVibrate('light', 100)
		setTimeout(() => {
			setIsLoading(false)
		}, 4000)
		handleGenerate()
	}

	return (
		<button
			onClick={handleClick}
			disabled={disabled}
			id='prompt-generate-button'
			className='flex gap-3 items-center justify-center w-full border border-primary-blue py-[11px] px-6 bg-blue-bg-transparency-12 min-h-12 rounded-[40px] mt-1 hover:bg-blue-bg-transparency-16 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-bg-transparency-12 disabled:hover:border-primary-blue/40'
		>
			{isLoading ? (
				<span className='text-sm text-primary-blue/65 font-medium'>Please waiting...</span>
			) : (
				<>
					<div className='flex items-center gap-1'>
						<Image
							src='/icons/coine.svg'
							alt='coinse'
							width={24}
							height={24}
						/>
						<span className='text-sm text-primary-blue font-medium'>{price}</span>
					</div>

					<i className='w-[1px] h-[18px] bg-primary-blue/40'></i>

					<div className='flex items-center gap-1'>
						<span className='text-sm text-primary-blue font-medium'>Generated</span>

						<Image
							src='/icons/magic-stick.svg'
							alt='magic stick'
							width={24}
							height={24}
						/>
					</div>
				</>
			)}
		</button>
	)
}
