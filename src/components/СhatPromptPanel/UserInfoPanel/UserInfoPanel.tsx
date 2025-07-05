import { useSelector } from 'react-redux'
import type { RootState } from 'store/store'

export const UserInfoPanel = () => {
	const userData = useSelector((state: RootState) => state.user)

	return (
		<div className='flex gap-2 items-center justify-between mb-8 px-3'>
			<span className='text-wight-bg-transparency-60 text-sm'>
				{userData.user?.name || 'User Name'}
			</span>

			<span className='text-wight-bg-transparency-60 text-sm'>Hailuo 02 (768p/10s)</span>
		</div>
	)
}
