'use client'

import cn from 'clsx'
import { AudioItem } from 'components/AudioItem/AudioItem'
import { ImageItem } from 'components/ImageItem/ImageItem'
import { type StatusItem, StatusPanel } from 'components/StatusPanel/StatusPanel'
import { VideoItem } from 'components/VideoItem/VideoItem'
import { useGenerations } from 'hooks/useGenerations'
import { memo } from 'react'
import type {
	AudioGenerationDetails,
	GenerationDetails,
	GenerationDetailsImgToImg
} from 'types/IVideo.type'

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
	if (!allDone)
		return (
			<StatusPanel
				state={{ type: 'loading', isLoadingState: isLoadingArray, typeGeneration: typeGeneration }}
			/>
		)

	const sizeClass =
		ids.length === 1 ? 'w-full h-full' : ids.length === 2 ? 'w-full h-1/2' : 'w-full'

	return (
		<>
			{ids.map(id => {
				const item = readyMap[id]
				const typeHint = item?.type

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

				if (item.type === 'i2i') {
					return (
						<ImageItem
							key={item.id}
							className={cn(sizeClass)}
							data={item as GenerationDetailsImgToImg}
						/>
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
