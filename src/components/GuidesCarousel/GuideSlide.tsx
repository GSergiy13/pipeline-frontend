import Image from 'next/image'

interface GuideSlideProps {
	guide: {
		image: string
		title: string
		description: string
	}
}

export const GuideSlide = ({ guide }: GuideSlideProps) => (
	<div className='flex md:flex-row gap-3 items-center transition-all duration-500'>
		<Image
			src={guide.image}
			alt={guide.title}
			width={146}
			height={136}
			className='rounded-2xl  object-contain'
		/>

		<div className='w-full md:w-1/2 '>
			<p className='text-xs text-white/60 text-left'>{guide.description}</p>
		</div>
	</div>
)
