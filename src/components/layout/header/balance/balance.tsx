import Image from 'next/image'
import { transformBalance } from 'utils/transform-balance'

interface BalanceProps {
	balance: number
}

export const Balance = ({ balance }: BalanceProps) => {
	const formattedBalance = transformBalance(balance)

	return (
		<div className='flex items-center gap-1'>
			<div className='flex items-center gap-0.5'>
				<Image
					src={'/icons/flame.svg'}
					width={16}
					height={16}
					alt='flame'
				/>
				<span className='text-sm'>{formattedBalance}</span>
			</div>

			<div className='flex items-center justify-center w-10 h-10 rounded-full bg-blue-bg-transparency-12'>
				<Image
					src={'/icons/plus.svg'}
					width={24}
					height={24}
					alt='plus'
				/>
			</div>
		</div>
	)
}
