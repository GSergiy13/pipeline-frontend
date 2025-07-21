'use client'

import cn from 'clsx'
import { type StatusItem, StatusPanel } from 'components/StatusPanel/StatusPanel'
import { VideoItem } from 'components/VideoItem/VideoItem'
import { useGenerations } from 'hooks/useGenerations'
import { memo } from 'react'

import EmptyStub from '../EmptyStub/EmptyStub'
import SkeletonItem from '../SkeletonItem/SkeletonItem'

interface Props {
	ids: string[]
	tgId: string | number
	isCompact: boolean
	isLoadingArray: StatusItem[]
}

const VideosGrid = memo(({ ids, tgId, isCompact, isLoadingArray }: Props) => {
	const readyMap = useGenerations(ids, tgId)

	const allDone = isLoadingArray.every(item => !item.status)

	if (!ids.length) return <EmptyStub />

	if (!allDone) return <StatusPanel state={{ type: 'loading', isLoadingState: isLoadingArray }} />

	return (
		<>
			{ids.map(id =>
				readyMap[id] ? (
					<VideoItem
						key={id}
						data={readyMap[id]}
						isCompactLayout={isCompact}
						className={cn(
							ids.length === 1 && 'w-full h-full',
							ids.length === 2 && 'w-full h-1/2',
							ids.length > 2 && 'w-full'
						)}
					/>
				) : (
					<SkeletonItem
						key={id}
						videoCount={ids.length}
					/>
				)
			)}
		</>
	)
})

export default VideosGrid
