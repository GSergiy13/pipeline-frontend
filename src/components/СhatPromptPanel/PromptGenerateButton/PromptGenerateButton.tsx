import Image from 'next/image'

export const PromptGenerateButton = () => {
	return (
		<button
			id='prompt-generate-button'
			className='flex gap-3 items-center justify-center w-full border border-primary-blue py-3 px-6 bg-blue-bg-transparency-12 min-h-12 rounded-[40px] mt-1'
		>
			<div className='flex items-center gap-1'>
				<Image
					src='/icons/coine.svg'
					alt='coinse'
					width={24}
					height={24}
				/>
				<span className='text-sm text-primary-blue font-medium'>40</span>
			</div>

			<i className='w-[1px] h-[18px] bg-primary-blue/40'></i>

			<div className='flex items-center gap-1'>
				<span className='text-sm text-primary-blue font-medium'>Generated</span>
				<Image
					src='/icons/magic-stick.svg'
					alt='coinse'
					width={24}
					height={24}
				/>
			</div>
		</button>
	)
}
