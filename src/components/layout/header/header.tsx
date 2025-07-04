import { Balance } from './balance/balance'
import { MarqueeText } from './marqueetext/marqueetext'

export const Header = () => {
	return (
		<header className='w-full py-3'>
			<div className='flex flex-col '>
				<div className=' w-full flex items-center justify-between px-3 mb-2'>
					<div>Seedance V1 Pro 1080p</div>

					<Balance balance={123456789} />
				</div>

				<MarqueeText />
			</div>
		</header>
	)
}
