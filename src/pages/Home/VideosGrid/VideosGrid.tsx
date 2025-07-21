'use client'

import cn from 'clsx'
import { StatusPanel } from 'components/StatusPanel/StatusPanel'
import { VideoItem } from 'components/VideoItem/VideoItem'
import { useGenerations } from 'hooks/useGenerations'
import { memo } from 'react'

import { EmptyStub } from '../EmptyStub/EmptyStub'
import { SkeletonItem } from '../SkeletonItem/SkeletonItem'

interface Props {
	ids: string[]
	tgId: string | number
	isCompact: boolean
}

export const VideosGrid = memo(({ ids, tgId, isCompact }: Props) => {
	const readyMap = useGenerations(ids, tgId)

	if (!ids.length) return <EmptyStub />

	if (!Object.keys(readyMap).length) return <StatusPanel state={{ type: 'loading' }} />

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
