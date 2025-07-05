import Marquee from 'react-fast-marquee'

const renderRepeatedText = (count: number) => {
	return Array.from({ length: count }).map((_, i) => (
		<span
			key={i}
			className='font-bold uppercase text-sm opacity-20 pl-1'
		>
			venstop ai generated •
		</span>
	))
}

export const MarqueeText = () => {
	return (
		<div className='relative w-full overflow-hidden'>
			<Marquee speed={30}>{renderRepeatedText(10)}</Marquee>
		</div>
	)
}
