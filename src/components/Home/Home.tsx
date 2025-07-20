'use client'

import cn from 'clsx'
import { VideoItem } from 'components/VideoItem/VideoItem'
import { ChatPromptPanel } from 'components/СhatPromptPanel/СhatPromptPanel'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from 'store/store'
import type { GenerationDetails } from 'types/IVideo.type'
import { waitUntilAnyVideoReady } from 'utils/waitUntilAnyVideoReady'

export const HomePage = () => {
	const ref = useRef<HTMLDivElement>(null)
	const [height, setHeight] = useState(150)
	const [firstReadyGeneration, setFirstReadyGeneration] = useState<GenerationDetails | null>(null)

	const quantity = useSelector((state: RootState) => state.generation.selectedParams.quantity)

	useEffect(() => {
		if (ref.current) {
			setHeight(ref.current.offsetHeight)
		}
	}, [])

	const videoItems = Array.from(
		{ length: typeof quantity === 'number' && quantity > 0 ? quantity : 0 },
		(_, i) => i + 1
	)
	const videoCount = videoItems.length
	const isCompactLayout = videoItems.length > 2

	useEffect(() => {
		const generationIds = ['687b905dbabf9d0584a0aad7']

		let cancelled = false

		const fetchFirstReady = async () => {
			try {
				const firstReady = await waitUntilAnyVideoReady(generationIds)
				if (!cancelled) {
					setFirstReadyGeneration(firstReady)
					console.log('Перше готове відео:', firstReady.resultUrl)
				}
			} catch (err) {
				console.error('Помилка очікування генерацій:', err)
			}
		}

		fetchFirstReady()

		return () => {
			cancelled = true
		}
	}, [])

	console.log('HomePage rendered with videoCount:', firstReadyGeneration)

	return (
		<div
			className='relative px-1 pt-1 w-full bg-chat-gradient rounded-t-[32px]'
			style={{ paddingBottom: `${height + 26}px` }}
		>
			<div
				className={cn(
					'w-full overflow-y-auto min-h-[350px] max-h-full h-full',
					videoCount > 2 ? 'grid grid-cols-2 gap-1.5' : 'flex flex-col'
				)}
			>
				{videoItems.map((item, index) => (
					<VideoItem
						key={index}
						videoUrl={firstReadyGeneration?.downloadUrl || ''}
						className={cn(
							videoCount === 1 && 'w-full h-full',
							videoCount === 2 && 'w-full h-1/2',
							videoCount > 2 && 'w-full'
						)}
						isCompactLayout={isCompactLayout}
					/>
				))}
			</div>

			<ChatPromptPanel ref={ref} />
		</div>
	)
}
