'use client'

import cn from 'clsx'
import { StatusPanel } from 'components/StatusPanel/StatusPanel'
import { VideoItem } from 'components/VideoItem/VideoItem'
import { ChatPromptPanel } from 'components/СhatPromptPanel/СhatPromptPanel'
import { useGenerations } from 'hooks/useGenerations'
import { useHeight } from 'hooks/useHeight'
import { memo, useMemo, useRef } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import type { RootState } from 'store/store'

import { EmptyStub } from './EmptyStub/EmptyStub'
import { SkeletonItem } from './SkeletonItem/SkeletonItem'

export const HomePage = memo(() => {
	const promptRef = useRef<HTMLDivElement>(null)
	const promptHeight = useHeight(promptRef, 150)

	const { user, videoCollectionIds } = useSelector(
		(s: RootState) => ({
			user: s.user.user,
			videoCollectionIds: s.generation.videoCollectionIds
		}),
		shallowEqual
	)

	const videoCount = videoCollectionIds.length
	const isCompactLayout = videoCount > 2
	const tgId = user?.tg_data?.id ?? '5621694270'

	const readyMap = useGenerations(videoCollectionIds, tgId)
	const hasReady = !!Object.keys(readyMap).length
	const balanceEmpty = user?.balance === 0

	const content = useMemo(() => {
		if (!videoCount) return <EmptyStub />
		if (balanceEmpty) return <StatusPanel state={{ type: 'insufficient_funds' }} />
		if (!hasReady) return <StatusPanel state={{ type: 'loading' }} />

		return videoCollectionIds.map(id =>
			readyMap[id] ? (
				<VideoItem
					key={id}
					data={readyMap[id]}
					isCompactLayout={isCompactLayout}
					className={cn(
						videoCount === 1 && 'w-full h-full',
						videoCount === 2 && 'w-full h-1/2',
						videoCount > 2 && 'w-full'
					)}
				/>
			) : (
				<SkeletonItem
					key={id}
					videoCount={videoCount}
				/>
			)
		)
	}, [videoCount, balanceEmpty, hasReady, readyMap, isCompactLayout, videoCollectionIds])

	return (
		<div
			className='relative px-1 pt-1 w-full bg-chat-gradient rounded-t-[32px] max-w-[640px] mx-auto'
			style={{ paddingBottom: `${promptHeight + 26}px` }}
		>
			<div
				className={cn(
					'w-full overflow-y-auto min-h-[350px] max-h-full h-full',
					isCompactLayout ? 'grid grid-cols-2 gap-1.5' : 'flex flex-col gap-1.5'
				)}
			>
				{content}
			</div>
			<ChatPromptPanel ref={promptRef} />
		</div>
	)
})
