'use client'

import cn from 'clsx'
import { StatusPanel } from 'components/StatusPanel/StatusPanel'
import { ChatPromptPanel } from 'components/СhatPromptPanel/СhatPromptPanel'
import { useInitialHeight } from 'hooks/useInitialHeight'
import { memo, useRef } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from 'store/store'

import GenerationsGrid from './GenerationsGrid/GenerationsGrid'

const useBalance = () => useSelector((s: RootState) => s.user.user?.balance)

const getGeneration = () => useSelector((s: RootState) => s.generation)

const useVideoIds = () =>
	useSelector(
		(s: RootState) => s.generation.videoCollectionIds,
		(a, b) => a.length === b.length && a.every((id, i) => id === b[i])
	)

const HomePage = memo(() => {
	const promptRef = useRef<HTMLDivElement>(null)
	const promptHeight = useInitialHeight(promptRef, 150)

	const balance = useBalance()
	const videoIds = useVideoIds()
	const generationOptions = getGeneration()

	const balanceEmpty = balance === 0
	const videoCount = videoIds.length
	const isCompactLayout = videoCount > 2
	const isLoadingArray =
		generationOptions.videoLoadingMap && typeof generationOptions.videoLoadingMap === 'object'
			? Object.entries(generationOptions.videoLoadingMap).map(([id, status]) => ({
					id,
					status
				}))
			: []

	// console.log('isLoadingArray', isLoadingArray)
	// console.log('videoIds', videoIds)

	return (
		<div
			className='relative px-1 pt-1 w-full bg-chat-gradient rounded-t-[32px] max-w-[640px] mx-auto'
			style={{ paddingBottom: `${promptHeight + 26}px` }}
		>
			{balanceEmpty ? (
				<StatusPanel state={{ type: 'insufficient_funds' }} />
			) : (
				<div
					className={cn(
						`w-full overflow-y-auto min-h-[350px] h-full aspect-[4/5] max-h-[calc(100dvh-190px)]`,
						isCompactLayout ? 'grid grid-cols-2 gap-1.5' : 'flex flex-col gap-1.5'
					)}
				>
					<GenerationsGrid
						ids={videoIds}
						typeGeneration={generationOptions.selectedModel?.type_generation || 'text-video'}
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
