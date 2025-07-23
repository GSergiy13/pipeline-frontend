import { useMemo } from 'react'
import Marquee from 'react-fast-marquee'

const MarqueeTextItem = ({ index }: { index: number }) => (
	<span className='font-bold uppercase text-sm opacity-20 pl-1'>sibrik ai generated •</span>
)

export const MarqueeText = () => {
	const items = useMemo(() => {
		return Array.from({ length: 30 }).map((_, i) => (
			<MarqueeTextItem
				key={i}
				index={i}
			/>
		))
	}, [])

	return (
		<div className='relative w-full overflow-hidden'>
			<Marquee speed={30}>{items}</Marquee>
		</div>
	)
}
