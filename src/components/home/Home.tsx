'use client'

import { useSelector } from 'react-redux'
import type { RootState } from 'store/store'

export const HomePage = () => {
	const userData = useSelector((state: RootState) => state.user)

	return (
		<div className='w-full h-[100vh] flex flex-col items-center justify-center'>
			{userData.user ? (
				<div className='mt-4'>
					<h2>User Information:</h2>
					<p>ID: {userData.user.id}</p>
					<p>Name: {userData.user.name}</p>
					<p>Username: {userData.user.username}</p>
				</div>
			) : (
				<p>No user data available.</p>
			)}
		</div>
	)
}
