'use client'

import cn from 'clsx'
import { VideoItem } from 'components/VideoItem/VideoItem'
import { ChatPromptPanel } from 'components/СhatPromptPanel/СhatPromptPanel'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from 'store/store'

export const HomePage = () => {
	const ref = useRef<HTMLDivElement>(null)
	const [height, setHeight] = useState(150)
	const data = useSelector((state: RootState) => state.generation.selectedParams.quantity)

	useEffect(() => {
		if (ref.current) {
			setHeight(ref.current.offsetHeight)
		}
	}, [])

	const videoItems = Array.from(
		{ length: typeof data === 'number' && data > 0 ? data : 0 },
		(_, i) => i + 1
	)
	const videoCount = videoItems.length
	const isCompactLayout = videoItems.length > 2

	return (
		<div
			className='relative px-1 pt-1 w-full bg-chat-gradient rounded-t-[32px]'
			style={{ paddingBottom: `${height + 26}px` }}
		>
			<div
				className={cn(
					' w-full overflow-y-auto min-h-[350px] max-h-full h-full',
					videoCount > 2 ? 'grid grid-cols-2 gap-1.5' : 'flex flex-col'
				)}
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
