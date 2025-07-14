'use client'

import Image from 'next/image'

import { ButtonBasic } from '@/ui/ButtonBasic/buttonBasic'

type StatusState =
	| { type: 'insufficient_funds' }
	| { type: 'loading'; progress: number; total: number; averageWait?: string }

export const StatusPanel = ({ state }: { state: StatusState }) => {
	if (state.type === 'insufficient_funds') {
		return (
			<div className='flex flex-col items-center justify-center text-center p-4 w-full'>
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
				<ButtonBasic text='Пополнить'></ButtonBasic>
			</div>
		)
	}

	if (state.type === 'loading') {
		return (
			<div className='flex flex-col items-center justify-center gap-2 text-center p-4'>
				<div className='animate-spin h-8 w-8 border-2 border-white/30 border-t-transparent rounded-full' />
				{state.averageWait && (
					<div className='text-white/60 text-sm'>Среднее время ожидания {state.averageWait}.</div>
				)}
				<div className='text-white text-base font-medium'>
					Генерация {state.progress}/{state.total}
				</div>
			</div>
		)
	}

	return null
}
