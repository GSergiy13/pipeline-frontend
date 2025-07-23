import cn from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import type { RootState } from 'store/store'

import { ButtonBasic } from '@/ui/ButtonBasic/buttonBasic'

const Welcome = () => {
	const isMobileTelegram = useSelector((state: RootState) => state.user.isMobileTelegram)
	const router = useRouter()

	const handleClick = () => {
		localStorage.setItem('onboarded', '1')
		document.cookie = 'onboarded=1; path=/'
		router.push('/')
	}

	return (
		<div
			className={cn(
				'min-h-screen w-full bg-primary-dark text-white pt-2 px-1 overflow-hidden flex items-center justify-center',
				{
					'tg-safe-area-welcome': isMobileTelegram
				}
			)}
		>
			<div className='relative max-w-[480px] w-full h-full max-h-[900px] z-10 flex flex-col justify-between bg-chat-gradient rounded-[32px]'>
				<Image
					fill
					quality={100}
					src='/wellcome.svg'
					alt='Welcome Background'
					className='absolute inset-0 w-full h-full object-cover opacity-20 z-0 rounded-[32px]'
					priority={true}
				/>

				<div className='relative w-full min-w-full aspect-[4/1] max-w-xs flex items-center justify-center m-x-auto mt-3'>
					<Image
						src='/sibrik-ai.svg'
						alt='Sibrik AI Logo'
						fill
						className='object-contain z-10 px-3.5'
					/>
				</div>

				<div className='flex flex-col gap-6 z-10 max-w-[220px] ml-8'>
					<h2 className='font-bold text-[24px]'>Wellcome 👋</h2>
					<p className='font-bold text-white/60'>
						Для того чтобы восопользоваться AI генератором видео, вам необходимо связаться с нашим
						менеджером
					</p>

					<ButtonBasic
						className='max-w-[170px]'
						onClick={handleClick}
					>
						<span className=' text-xs font-medium text-primary-blue'>Менеджер</span>

						<Image
							src={'/icons/telegram.svg'}
							width={18}
							height={18}
							alt='arrow right'
						/>
					</ButtonBasic>
				</div>

				<div className='text-white/40 text-[10px] text-center mb-6'>Sibrik AI v. 0.1.2 beta</div>
			</div>
		</div>
	)
}

export default Welcome
