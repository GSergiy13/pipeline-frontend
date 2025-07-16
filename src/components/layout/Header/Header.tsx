'use client'

import cn from 'clsx'
import { modelgenerate } from 'constants/modelgenerate.const'
import { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from 'store/store'

import { DropDown } from '@/ui/DropDown/Dropdown'

import { Balance } from './Balance/balance'
import { MarqueeText } from './MarqueeText/MarqueeText'

export const Header = () => {
	const isMobileTelegram = useSelector((state: RootState) => state.user.isMobileTelegram)
	const [showSafeArea, setShowSafeArea] = useState(false)

	useLayoutEffect(() => {
		setShowSafeArea(isMobileTelegram)
	}, [isMobileTelegram])

	return (
		<header
			className={cn(`w-full pb-3`, {
				'tg-safe-area': showSafeArea
			})}
		>
			<div className='flex flex-col pt-3'>
				<div className='w-full flex items-center justify-between px-3 mb-2'>
					<DropDown data={modelgenerate} />
					<Balance balance={1234567} />
				</div>

				<MarqueeText />
			</div>
		</header>
	)
}
