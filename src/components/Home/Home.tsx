'use client'

import { StatusPanel } from 'components/StatusPanel/StatusPanel'
import { ChatPromptPanel } from 'components/СhatPromptPanel/СhatPromptPanel'

export const HomePage = () => {
	return (
		<div className='relative flex flex-1 justify-center px-1 pt-1 pb-40 mx-auto  bg-chat-gradient rounded-t-[32px]'>
			<StatusPanel
				state={{
					type: 'loading',
					progress: 2,
					total: 5,
					averageWait: '4мин'
				}}
			/>

			{/* <VideoItem /> */}
			<ChatPromptPanel />
		</div>
	)
}
