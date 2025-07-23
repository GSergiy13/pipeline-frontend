'use client'

import cn from 'clsx'
import { memo } from 'react'

const SkeletonAudioItem = memo(() => (
	<div className='flex gap-1 w-full h-full'>
		<div className={cn('relative rounded-[30px] p-5 bg-white/10 w-full h-[200px]')}>
			<div className='absolute top-5 left-5 w-9 h-9 rounded-xl animate-pulse bg-gray-400/20' />
			<div className='absolute bottom-5 left-5'>
				<div className='h-4 w-24 bg-gray-400/30 rounded mt-1 animate-pulse' />
			</div>
		</div>
		<div className={cn('relative rounded-[30px] p-5 bg-white/10  w-full h-[200px]')}>
			<div className='absolute top-5 left-5 w-9 h-9 rounded-xl animate-pulse bg-gray-400/20' />
			<div className='absolute bottom-5 left-5'>
				<div className='h-4 w-24 bg-gray-400/30 rounded mt-1 animate-pulse' />
			</div>
		</div>
	</div>
))

export default SkeletonAudioItem
