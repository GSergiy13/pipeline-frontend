import { modelgenerate } from 'constants/modelgenerate.const'

import { DropDown } from '@/ui/DropDown/Dropdown'

import { Balance } from './Balance/balance'
import { MarqueeText } from './MarqueeText/MarqueeText'

export const Header = () => {
	return (
		<header className='w-full pb-3 tg-header'>
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
