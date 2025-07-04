'use client'

import { useSelector } from 'react-redux'
import type { RootState } from 'store/store'

export const HomePage = () => {
	const userData = useSelector((state: RootState) => state.user.data)

	console.log('User Data:', userData)

	return (
		<div className='w-full h-[100vh] flex flex-col items-center justify-center'>
			<h1>Welcome to the Home Page</h1>
			<p>This is the main page of our application.</p>

			{userData && (
				<div className='mt-4'>
					<h2>User Data:</h2>
				</div>
			)}
		</div>
	)
}
