'use client'

import cn from 'clsx'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { handleVibrate } from 'utils/handleVibrate'
import { transformBalance } from 'utils/transform-balance'

import { ButtonBasic } from '@/ui/ButtonBasic/buttonBasic'

interface BalanceProps {
	balance: number
}

export const Balance = ({ balance }: BalanceProps) => {
	const [show, setShow] = useState(false)
	const formattedBalance = transformBalance(balance)

	const wrapperRef = useRef<HTMLDivElement>(null)

	const handleToggle = () => {
		setShow(prev => !prev)
		handleVibrate('light', 100)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setShow(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div
			ref={wrapperRef}
			className='relative flex items-center gap-1'
		>
			<div className='flex items-center gap-0.5'>
				<Image
					src='/icons/flame-g.svg'
					width={16}
					height={16}
					alt='flame'
				/>
				<span className='text-sm'>{formattedBalance}</span>
			</div>

			<div
				className='flex items-center justify-center w-10 h-10 rounded-full bg-blue-bg-transparency-12'
				onClick={handleToggle}
			>
				<Image
					className={cn('transition-transform duration-300 ease-in-out', {
						'rotate-45': show,
						'rotate-0': !show
					})}
					src='/icons/plus.svg'
					width={24}
					height={24}
					alt='plus'
				/>
			</div>

			<div
				className={cn(
					'absolute top-12 right-0 min-w-[215px] flex flex-col gap-3 p-3 rounded-3xl bg-wight-bg-transparency-04 backdrop-blur-[90px] transition-all duration-300 ease-in-out z-40',
					{
						'opacity-0 pointer-events-none -translate-y-2': !show,
						'opacity-100 pointer-events-auto translate-y-0': show
					}
				)}
			>
				<p className='text-sm text-center'>Для пополнения баланса свяжитесь с менеджером</p>

				<ButtonBasic>
					<span className='text-xs font-medium text-primary-blue'>Перейти</span>
					<Image
						src='/icons/telegram.svg'
						width={18}
						height={18}
						alt='telegram'
					/>
				</ButtonBasic>
			</div>
		</div>
	)
}
