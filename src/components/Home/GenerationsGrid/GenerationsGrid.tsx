'use client'

import cn from 'clsx'
import { AudioItem } from 'components/AudioItem/AudioItem'
import { type StatusItem, StatusPanel } from 'components/StatusPanel/StatusPanel'
import { VideoItem } from 'components/VideoItem/VideoItem'
import { useGenerations } from 'hooks/useGenerations'
import { memo } from 'react'
import type { AudioGenerationDetails, GenerationDetails } from 'types/IVideo.type'

import EmptyStub from '../EmptyStub/EmptyStub'
import SkeletonAudioItem from '../SkeletonLoading/SkeletonAudioItem'
import SkeletonVideoItem from '../SkeletonLoading/SkeletonVideoItem'

// import ImageItem from 'components/ImageItem/ImageItem'

interface Props {
	ids: string[]
	isCompact: boolean
	isLoadingArray: StatusItem[]
	typeGeneration: string
}

const GenerationsGrid = memo(({ ids, isCompact, typeGeneration, isLoadingArray }: Props) => {
	const readyMap = useGenerations(ids)
	const allDone = isLoadingArray.every(item => !item.status)

	if (ids.length === 0) return <EmptyStub typeGeneration={typeGeneration} />
	if (!allDone) return <StatusPanel state={{ type: 'loading', isLoadingState: isLoadingArray }} />

	const sizeClass =
		ids.length === 1 ? 'w-full h-full' : ids.length === 2 ? 'w-full h-1/2' : 'w-full'

	return (
		<>
			{ids.map(id => {
				const item = readyMap[id]
				const typeHint = item?.type || 't2v'

				if (!item) {
					switch (typeHint) {
						case 't2a':
							return <SkeletonAudioItem key={id} />
						case 't2i':
							return 'lorem'
						default:
							return (
								<SkeletonVideoItem
									key={id}
									videoCount={ids.length}
								/>
							)
					}
				}

				if (item.type === 't2a') {
					return (
						<div
							key={id}
							className='w-full h-1/3 flex items-center gap-1'
						>
							<AudioItem data={item as AudioGenerationDetails} />
						</div>
					)
				}

				if (item.type === 't2i') {
					return (
						<div
							key={id}
							className='w-full h-auto bg-dark-bg-transparency-4 flex items-center justify-center rounded-[24px] aspect-[16/9]'
						>
							{/* <ImageItem data={item} /> */}
							<p className='text-sm text-white/60'>[Image Placeholder]</p>
						</div>
					)
				}

				return (
					<VideoItem
						key={id}
						data={item as GenerationDetails}
						isCompactLayout={isCompact}
						className={cn(sizeClass)}
					/>
				)
			})}
		</>
	)
})

export default GenerationsGrid
