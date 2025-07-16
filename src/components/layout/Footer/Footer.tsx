'use client'

import { useSelector } from 'react-redux'
import type { RootState } from 'store/store'

export const Footer = () => {
	const userData = useSelector((state: RootState) => state.user)

	return (
		<footer className='text-[10px] text-white/40 text-center pt-1 pb-5'>
			Name AI v. 0.1 beta{' '}
			{userData.user?.tg_data?.id ? `by user id ${userData.user.tg_data?.id}` : ''}
		</footer>
	)
}
