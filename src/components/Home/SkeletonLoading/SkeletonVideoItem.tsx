'use client'

import cn from 'clsx'
import { memo } from 'react'

interface Props {
	videoCount: number
}

const SkeletonVideoItem = memo(({ videoCount }: Props) => {
	return (
		<div
			className={cn(
				'relative rounded-[30px] p-5 bg-white/10',
				videoCount === 1 && 'w-full h-full',
				videoCount === 2 && 'w-full h-1/2',
				videoCount > 2 && 'w-full aspect-video'
			)}
		>
			<div className='absolute top-5 left-5 w-9 h-9 rounded-xl animate-pulse bg-gray-400/30' />
			<div className='absolute bottom-5 left-5'>
				<div className='h-6 w-32 bg-gray-400/40 rounded animate-pulse' />
				<div className='h-4 w-24 bg-gray-400/30 rounded mt-1 animate-pulse' />
			</div>
		</div>
	)
})

export default SkeletonVideoItem
