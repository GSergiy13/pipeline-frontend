'use client'

import Image from 'next/image'

interface EmptyStubProps {
	typeGeneration?: string
}

const EmptyStub = ({ typeGeneration }: EmptyStubProps) => {
	return (
		<div className='flex flex-col gap-10 items-center justify-center w-full h-full text-gray-500 text-lg'>
			<Image
				src={
					typeGeneration === 'text-audio'
						? '/icons/music-placeholder.svg'
						: typeGeneration === 'img-to-img'
							? '/icons/image-placeholder.svg'
							: '/icons/video-placeholder.svg'
				}
				width={80}
				height={80}
				alt='Play Icon'
			/>
			<span className='ml-2'>У вас пока нет генераций</span>
		</div>
	)
}

export default EmptyStub
