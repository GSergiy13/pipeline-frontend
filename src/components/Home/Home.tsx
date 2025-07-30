'use client'

import cn from 'clsx'
import { StatusPanel } from 'components/StatusPanel/StatusPanel'
import { ChatPromptPanel } from 'components/СhatPromptPanel/СhatPromptPanel'
import { useInitialHeight } from 'hooks/useInitialHeight'
import { useSelectedModel } from 'hooks/useSelectedModel'
import { memo, useMemo, useRef } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { progressSelectors } from 'store/slices/generationProgressSlice'
import type { RootState } from 'store/store'

import GenerationsGrid from './GenerationsGrid/GenerationsGrid'

const arrEq = (a: string[], b: string[]) =>
	a === b || (a.length === b.length && a.every((id, i) => id === b[i]))

const selectBalance = (s: RootState) => s.user.user?.balance ?? 0
const selectVideoIds = progressSelectors.selectIds
const selectVideoStatusMap = progressSelectors.selectEntities

const HomePage = memo(() => {
	const promptRef = useRef<HTMLDivElement>(null)
	const promptHeight = useInitialHeight(promptRef, 150)
	const selectedModel = useSelectedModel()

	const balance = useSelector(selectBalance)
	const videoIds = useSelector(selectVideoIds, arrEq)
	const videoStatusMap = useSelector(selectVideoStatusMap, shallowEqual)

	const balanceEmpty = balance < 1
	const isCompactLayout = videoIds.length > 2

	const isLoadingArray = useMemo(
		() =>
			Object.entries(videoStatusMap ?? {}).map(([id, status]) => ({
				id,
				status: status ?? { isLoading: false, isComplete: false }
			})),
		[videoStatusMap]
	)

	const paddingBottom = useMemo(() => `${promptHeight + 26}px`, [promptHeight])

	return (
		<div
			className={cn('relative px-1 pt-1 w-full bg-chat-gradient rounded-t-[32px] mx-auto')}
			style={{ paddingBottom }}
		>
			{balanceEmpty ? (
				<StatusPanel state={{ type: 'insufficient_funds' }} />
			) : (
				<div
					className={cn(
						'w-full overflow-y-auto h-full transition-opacity duration-300',
						isCompactLayout ? 'grid grid-cols-2 gap-1.5' : 'flex flex-col gap-1.5'
					)}
				>
					<GenerationsGrid
						ids={videoIds}
						typeGeneration={selectedModel?.type_generation ?? 'text-video'}
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
