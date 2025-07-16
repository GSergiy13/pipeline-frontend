'use client'

import cn from 'clsx'
import { modelgenerate } from 'constants/modelgenerate.const'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedModel } from 'store/slices/generationSlice'
import type { RootState } from 'store/store'

import { DropDown } from '@/ui/DropDown/Dropdown'

import { Balance } from './Balance/balance'
import { MarqueeText } from './MarqueeText/MarqueeText'

export const Header = () => {
	const dispatch = useDispatch()
	const user_data = useSelector((state: RootState) => state.user)

	useEffect(() => {
		dispatch(setSelectedModel(modelgenerate[0]))
	}, [dispatch])

	const handleModelSelect = (model: (typeof modelgenerate)[number]) => {
		dispatch(setSelectedModel(model))
	}

	return (
		<header
			className={cn(`w-full pb-3`, {
				'tg-safe-area': user_data.isMobileTelegram
			})}
		>
			<div className='flex flex-col pt-3'>
				<div className='w-full flex items-center justify-between px-3 mb-2'>
					<DropDown
						data={modelgenerate}
						onSelect={handleModelSelect}
					/>

					<Balance balance={user_data.user?.balance ?? 0} />
				</div>

				<MarqueeText />
			</div>
		</header>
	)
}
