'use client'

import { GuidesCarousel } from 'components/GuidesCarousel/GuidesCarousel'
import { useProgress } from 'hooks/useProgress'
import Image from 'next/image'

import { ButtonBasic } from '@/ui/ButtonBasic/buttonBasic'

export type StatusItem = { id: string; status: boolean }

type StatusState =
	| { type: 'insufficient_funds'; isLoadingState?: StatusItem[] }
	| { type: 'loading'; isLoadingState?: StatusItem[] }

export const StatusPanel = ({ state }: { state?: StatusState }) => {
	if (!state) return null
	let loadingTime

	const loadingState = state.isLoadingState ?? []
	const total = loadingState.length

	if (total === 1) {
		loadingTime = '2 мин.'
	} else if (total === 2) {
		loadingTime = '4 мин.'
	} else {
		loadingTime = '5 мин.'
	}

	const completed = loadingState.filter(item => !item.status).length

	const fakeProgress = useProgress(loadingState)

	if (state.type === 'insufficient_funds') {
		return (
			<div className='flex flex-col items-center justify-center text-center p-4 w-full max-w-[400px]'>
				<Image
					src='/icons/warning.svg'
					alt='Insufficient Funds'
					width={80}
					height={80}
					className='mb-3'
				/>
				<div className='text-white/60 leading-snug font-bold max-w-[220px] mb-10'>
					Недостаточно средств. Свяжитесь с менеджером
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
				<div className='flex flex-col items-center justify-center text-center mt-14 w-full'>
					<div className='mb-8'>
						Генерация {completed}/{total}
					</div>

					<div className='relative w-full bg-dark-bg-transparency-12 rounded h-2 overflow-hidden mb-2'>
						<div
							className='h-full bg-primary-blue transition-all duration-500'
							style={{ width: `${fakeProgress}%` }}
						/>
					</div>

					<div className='text-white/60 font-bold'>Среднее время ожидания {loadingTime}</div>
				</div>
			</div>
		)
	}

	return null
}
