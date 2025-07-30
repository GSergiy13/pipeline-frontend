'use client'

import cn from 'clsx'
import { AudioItem } from 'components/AudioItem/AudioItem'
import { ImageItem } from 'components/ImageItem/ImageItem'
import { StatusPanel } from 'components/StatusPanel/StatusPanel'
import { VideoItem } from 'components/VideoItem/VideoItem'
import { useGenerationSSE } from 'hooks/useGenerationSSE'
import { memo } from 'react'
import type { VideoLoadingStatus } from 'store/slices/generationSlice'
import type {
	AudioGenerationDetails,
	GenerationDetails,
	GenerationDetailsImgToImg
} from 'types/IVideo.type'

import EmptyStub from '../EmptyStub/EmptyStub'
import SkeletonAudioItem from '../SkeletonLoading/SkeletonAudioItem'
import SkeletonVideoItem from '../SkeletonLoading/SkeletonVideoItem'

interface Props {
	ids: string[]
	isCompact: boolean
	isLoadingArray: { id: string; status: VideoLoadingStatus }[]
	typeGeneration: string
}

const GenerationsGrid = memo(({ ids, isCompact, typeGeneration, isLoadingArray }: Props) => {
	const readyMap = useGenerationSSE(ids, isLoadingArray)

	const allDone = isLoadingArray.every(item => !item.status.isLoading)

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
					console.log('AudioItem', item)
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
					const items = item as GenerationDetailsImgToImg

					if (items.imageDownloadUrls.length <= 2) {
						return items.imageDownloadUrls.map((url, index) => (
							<ImageItem
								key={index}
								className={cn(sizeClass)}
								data={items}
								url={url}
							/>
						))
					}

					const grouped = []
					for (let i = 0; i < items.imageDownloadUrls.length; i += 2) {
						grouped.push(
							<div
								key={`group-${i}`}
								className='flex h-full w-full gap-1'
							>
								{items.imageDownloadUrls.slice(i, i + 2).map((url, index) => (
									<ImageItem
										key={`${i}-${index}`}
										className='w-1/2'
										data={items}
										url={url}
									/>
								))}
							</div>
						)
					}

					return grouped
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
