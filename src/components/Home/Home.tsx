'use client'

import { ChatPromptPanel } from 'components/СhatPromptPanel/СhatPromptPanel'
import { useSelector } from 'react-redux'
import type { RootState } from 'store/store'

import { ButtonBasic } from '@/ui/ButtonBasic/buttonBasic'

export const HomePage = () => {
	const userData = useSelector((state: RootState) => state.user)

	return (
		<div className='relative w-[calc(100vw-8px)] flex flex-col px-3 py-4 mx-auto h-[80vh] items-center justify-center bg-chat-gradient rounded-t-[32px]'>
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

			<ButtonBasic
				text='Click me'
				className='mt-5'
				onClick={() => console.log('Button clicked!')}
			/>

			<ChatPromptPanel />
		</div>
	)
}
