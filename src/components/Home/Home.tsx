'use client'

import cn from 'clsx'
import { VideoItem } from 'components/VideoItem/VideoItem'
import { ChatPromptPanel } from 'components/СhatPromptPanel/СhatPromptPanel'
import { useEffect, useRef, useState } from 'react'

export const HomePage = () => {
	const ref = useRef<HTMLDivElement>(null)
	const [height, setHeight] = useState(150)

	useEffect(() => {
		if (ref.current) {
			setHeight(ref.current.offsetHeight)
		}
	}, [])

	const videoItems = [1, 3, 4, 5]
	const videoCount = videoItems.length
	const isCompactLayout = videoItems.length > 2

	return (
		<div className='relative flex flex-1 flex-col px-1 pt-1 mx-auto bg-chat-gradient rounded-t-[32px]'>
			<div
				className={cn(
					'left-0 right-0 overflow-y-auto',
					videoCount > 2 ? 'grid grid-cols-2 gap-1.5' : 'flex flex-col'
				)}
				style={{
					height: `calc(650px - ${height + 26}px)`
				}}
			>
				{videoItems.map((item, index) => (
					<VideoItem
						key={index}
						className={cn(
							videoCount === 1 && 'w-full h-full',
							videoCount === 2 && 'w-full h-1/2',
							videoCount > 2 && 'w-full'
						)}
						isCompactLayout={isCompactLayout}
					/>
				))}
			</div>

			<ChatPromptPanel ref={ref} />
		</div>
	)
}
