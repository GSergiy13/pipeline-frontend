'use client'

import { ChatPromptPanel } from 'components/СhatPromptPanel/СhatPromptPanel'
import { useSelector } from 'react-redux'
import type { RootState } from 'store/store'

export const HomePage = () => {
	const userData = useSelector((state: RootState) => state.user)

	return (
		<div className='relative flex flex-1 flex-col px-3 pt-4 pb-0 mx-auto items-center justify-center bg-chat-gradient rounded-t-[32px]'>
			<div className='flex flex-col items-center justify-center w-full max-w-2xl -translate-y-1/2'>
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

			<ChatPromptPanel />
		</div>
	)
}
