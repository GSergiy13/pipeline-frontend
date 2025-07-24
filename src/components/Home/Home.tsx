'use client'

import cn from 'clsx'
import { StatusPanel } from 'components/StatusPanel/StatusPanel'
import { ChatPromptPanel } from 'components/СhatPromptPanel/СhatPromptPanel'
import { useInitialHeight } from 'hooks/useInitialHeight'
import { memo, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from 'store/store'

import GenerationsGrid from './GenerationsGrid/GenerationsGrid'

const HomePage = memo(() => {
	const promptRef = useRef<HTMLDivElement>(null)
	const promptHeight = useInitialHeight(promptRef, 150)

	const videoIds = useSelector((s: RootState) => s.generation.videoCollectionIds)
	const balance = useSelector((s: RootState) => s.user.user?.balance)
	const selectedModel = useSelector((s: RootState) => s.generation.selectedModel)
	const videoLoadingMap = useSelector((s: RootState) => s.generation.videoLoadingMap)

	const isCompactLayout = videoIds.length > 2
	const isLoadingArray = useMemo(
		() => Object.entries(videoLoadingMap || {}).map(([id, status]) => ({ id, status })),
		[videoLoadingMap]
	)

	const balanceEmpty = balance === 0

	return (
		<div className='relative flex flex-col w-full h-full max-w-[640px] mx-auto bg-chat-gradient rounded-t-[32px]'>
			{balanceEmpty ? (
				<StatusPanel state={{ type: 'insufficient_funds' }} />
			) : (
				<div
					className={cn(
						'flex-1 overflow-y-auto',
						isCompactLayout ? 'grid grid-cols-2 gap-1.5' : 'flex flex-col gap-1.5'
					)}
					style={{ paddingBottom: `${promptHeight + 26}px` }}
				>
					<GenerationsGrid
						ids={videoIds}
						typeGeneration={selectedModel?.type_generation || 'text-video'}
						isCompact={isCompactLayout}
						isLoadingArray={isLoadingArray}
					/>
				</div>
			)}

			<ChatPromptPanel ref={promptRef} />
		</div>
	)
})

export default HomePage
