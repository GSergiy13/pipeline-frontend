import Image from 'next/image'

export const ExpandInputButton = () => {
	return (
		<button className='absolute right-2 top-2 bg-transparent border-none'>
			<Image
				src={'/icons/expand.svg'}
				alt='Expand input'
				width={20}
				height={20}
			/>
		</button>
	)
}
