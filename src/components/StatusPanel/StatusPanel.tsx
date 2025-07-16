'use client'

import { GuidesCarousel } from 'components/GuidesCarousel/GuidesCarousel'
import Image from 'next/image'

import { ButtonBasic } from '@/ui/ButtonBasic/buttonBasic'
import { Spinner } from '@/ui/Spinner/Spinner'

type StatusState =
	| { type: 'insufficient_funds' }
	| { type: 'loading'; progress: number; total: number; averageWait?: string }

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
			<div className='h-full flex flex-col items-center text-center p-4 w-full max-w-[680px]'>
				<GuidesCarousel />

				<div className='flex flex-col items-center justify-center gap-3 text-center p-4 mt-4'>
					<Spinner />

					{state.averageWait && (
						<div className='text-white/60  font-bold max-w-[180px]'>
							Среднее время ожидания {state.averageWait}.
						</div>
					)}
					<div className='text-white'>
						Генерация {state.progress}/{state.total}
					</div>
				</div>
			</div>
		)
	}

	return null
}
