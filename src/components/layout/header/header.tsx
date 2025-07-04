import { modelgenerate } from 'constants/modelgenerate.const'

import { DropDown } from '@/ui/dropdown/dropdown'

import { Balance } from './balance/balance'
import { MarqueeText } from './marqueetext/marqueetext'

export const Header = () => {
	return (
		<header className='w-full py-3'>
			<div className='flex flex-col '>
				<div className=' w-full flex items-center justify-between px-3 mb-2'>
					<DropDown data={modelgenerate} />

					<Balance balance={1234567} />
				</div>

				<MarqueeText />
			</div>
		</header>
	)
}
