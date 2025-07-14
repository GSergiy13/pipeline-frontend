'use client'

import { GUIDE_DATA } from 'constants/guidesdata.const'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { GuideSlide } from './GuideSlide'

export const GuidesCarousel = () => {
	const [index, setIndex] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex(prev => (prev + 1) % GUIDE_DATA.length)
		}, 5000)
		return () => clearInterval(interval)
	}, [])

	return (
		<div className='relative w-full overflow-hidden pt-5 min-h-[180px]'>
			<AnimatePresence mode='wait'>
				<motion.div
					key={index}
					className='absolute inset-0'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
				>
					<GuideSlide guide={GUIDE_DATA[index]} />
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
