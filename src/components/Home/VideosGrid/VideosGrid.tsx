'use client'

import cn from 'clsx'
import { AudioItem } from 'components/AudioItem/AudioItem'
import { type StatusItem, StatusPanel } from 'components/StatusPanel/StatusPanel'
import { VideoItem } from 'components/VideoItem/VideoItem'
import { useGenerations } from 'hooks/useGenerations'
import { memo } from 'react'
import type { AudioGenerationDetails, GenerationDetails } from 'types/IVideo.type'

import EmptyStub from '../EmptyStub/EmptyStub'
import SkeletonAudioItem from '../SkeletonItem/SkeletonAudioItem'
import SkeletonVideoItem from '../SkeletonItem/SkeletonVideoItem'

interface Props {
	ids: string[]
	tgId: string | number
	isCompact: boolean
	isLoadingArray: StatusItem[]
}

const VideosGrid = memo(({ ids, tgId, isCompact, isLoadingArray }: Props) => {
	const readyMap = useGenerations(ids, tgId)

	const allDone = isLoadingArray.every(item => !item.status)
	const isAudio =
		ids.length > 0 &&
		ids.every(id => {
			const item = readyMap[id]
			if (!item) return true
			return item.type === 't2a'
		})

	console.log('isAudio', isAudio)

	if (!ids.length) return <EmptyStub />

	if (!allDone) return <StatusPanel state={{ type: 'loading', isLoadingState: isLoadingArray }} />

	return (
		<>
			{ids.map(id => {
				const item = readyMap[id]

				if (!item) {
					return isAudio ? (
						<SkeletonAudioItem key={id} />
					) : (
						<SkeletonVideoItem
							key={id}
							videoCount={ids.length}
						/>
					)
				}

				if (isAudio) {
					return (
						<div
							key={id}
							className={cn('w-full h-1/2')}
						>
							<AudioItem data={item as AudioGenerationDetails} />
						</div>
					)
				}

				return (
					<VideoItem
						key={id}
						data={item as GenerationDetails}
						isCompactLayout={isCompact}
						className={cn(
							ids.length === 1 && 'w-full h-full',
							ids.length === 2 && 'w-full h-1/2',
							ids.length > 2 && 'w-full'
						)}
					/>
				)
			})}
		</>
	)
})

export default VideosGrid
