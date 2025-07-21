'use client'

import { GuidesCarousel } from 'components/GuidesCarousel/GuidesCarousel'
import Image from 'next/image'

import { ButtonBasic } from '@/ui/ButtonBasic/buttonBasic'

type StatusState = { type: 'insufficient_funds' } | { type: 'loading' }

export const StatusPanel = ({ state }: { state: StatusState }) => {
	if (state.type === 'insufficient_funds') {
		return (
			<div className='flex flex-col items-center justify-center text-center p-4 w-full max-w-[400px] '>
				<Image
					src='/icons/warning.svg'
					alt='Insufficient Funds'
					width={80}
					height={80}
					className='mb-3'
				/>
				<div className='text-white/60 leading-snug font-bold max-w-[220px] mb-10'>
					Недостаточно средств Свяжитесь с менеджером
				</div>
				<ButtonBasic>
					<span>Пополнить</span>
				</ButtonBasic>
			</div>
		)
	}

	if (state.type === 'loading') {
		return (
			<div className='h-full flex flex-col items-center text-center p-4 w-full'>
				<GuidesCarousel />

				<div className=' flex flex-col items-center justify-center text-center  mt-14 w-full'>
					<div className='mb-8'>Генерация 2/5</div>
					<div className='relative w-full bg-dark-bg-transparency-12 rounded h-2 overflow-hidden mb-2'>
						<div className='w-[33%] h-full bg-primary-blue'></div>
					</div>

					<div className='text-white/60 font-bold '>Среднее время ожидания 4мин.</div>
				</div>
			</div>
		)
	}

	return null
}
