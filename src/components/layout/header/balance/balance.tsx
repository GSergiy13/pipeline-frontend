'use client'

import cn from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import { transformBalance } from 'utils/transform-balance'

interface BalanceProps {
	balance: number
}

export const Balance = ({ balance }: BalanceProps) => {
	const [show, setShow] = useState(false)
	const formattedBalance = transformBalance(balance)

	const handleMouseEnter = () => {
		setShow(!show)
	}

	return (
		<div className='relative flex items-center gap-1'>
			<div className='flex items-center gap-0.5'>
				<Image
					src={'/icons/flame.svg'}
					width={16}
					height={16}
					alt='flame'
				/>
				<span className='text-sm'>{formattedBalance}</span>
			</div>

			<div
				className='flex items-center justify-center w-10 h-10 rounded-full bg-blue-bg-transparency-12'
				onClick={handleMouseEnter}
			>
				<Image
					className={cn('transition-transform duration-300 ease-in-out', {
						'rotate-45': show,
						'rotate-0': !show
					})}
					src={'/icons/plus.svg'}
					width={24}
					height={24}
					alt='plus'
				/>
			</div>

			<div
				className={cn(
					'absolute top-12 right-0 min-w-[215px]  flex flex-col gap-3 p-3 rounded-3xl bg-wight-bg-transparency-04 backdrop-blur-[90px] transition-all duration-300 ease-in-out',
					{
						'opacity-0 pointer-events-none -translate-y-2': !show,
						'opacity-100 pointer-events-auto translate-y-0': show
					}
				)}
			>
				<p className='text-sm text-center'>Для пополнения баланса свяжитесь с менеджером</p>

				<button
					className='flex w-full items-center justify-center gap-2.5 p-3 rounded-[60px] bg-blue-bg-transparency-12 border border-primary-blue'
					type='button'
				>
					<span className=' text-xs font-medium text-primary-blue'>Перейти</span>

					<Image
						src={'/icons/telegram.svg'}
						width={18}
						height={18}
						alt='arrow right'
					/>
				</button>
			</div>
		</div>
	)
}
