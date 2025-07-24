'use client'

import cn from 'clsx'
import { StatusPanel } from 'components/StatusPanel/StatusPanel'
import { ChatPromptPanel } from 'components/СhatPromptPanel/СhatPromptPanel'
import { useInitialHeight } from 'hooks/useInitialHeight'
import { memo, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from 'store/store'

import GenerationsGrid from './GenerationsGrid/GenerationsGrid'

const useBalance = () =>
	useSelector(
		(s: RootState) => s.user.user?.balance,
		(a, b) => a === b
	)

const useSelectedModel = () =>
	useSelector(
		(s: RootState) => s.generation.selectedModel,
		(a, b) => a?.id === b?.id
	)

const useVideoLoadingMap = () => useSelector((s: RootState) => s.generation.videoLoadingMap)

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
	const selectedModel = useSelectedModel()
	const videoLoadingMap = useVideoLoadingMap()

	const balanceEmpty = balance === 0
	const videoCount = videoIds.length
	const isCompactLayout = videoCount > 2

	const isLoadingArray = useMemo(() => {
		if (!videoLoadingMap || typeof videoLoadingMap !== 'object') return []
		return Object.entries(videoLoadingMap).map(([id, status]) => ({ id, status }))
	}, [videoLoadingMap])

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
