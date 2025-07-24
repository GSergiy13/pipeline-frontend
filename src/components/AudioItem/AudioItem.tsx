'use client'

import cn from 'clsx'
import { NEXT_PUBLIC_API_URL } from 'constants/CONST_API'
import Image from 'next/image'
import { useRef, useState } from 'react'
import type { AudioGenerationDetails } from 'types/IVideo.type'

import { DownloadButton } from '@/ui/DownloadButton/DownloadButton'

interface AudioItemProps {
	data: AudioGenerationDetails
}

export const AudioItem = ({ data }: AudioItemProps) => {
	return (
		<>
			{data.audioDownloadUrls.map((item, index) => (
				<SingleAudioCard
					key={index}
					audioUrl={`${item.link}`}
					posterUrl={`${NEXT_PUBLIC_API_URL}${item.image}`}
					createdAt={data.createdAt}
				/>
			))}
		</>
	)
}

interface SingleAudioCardProps {
	audioUrl: string
	posterUrl: string
	createdAt: string
}
const SingleAudioCard = ({ audioUrl, createdAt, posterUrl }: SingleAudioCardProps) => {
	const audioRef = useRef<HTMLAudioElement>(null)
	const [isPlaying, setIsPlaying] = useState(false)

	const togglePlay = () => {
		const audio = audioRef.current
		if (!audio) return

		if (audio.paused) {
			audio.play()
			setIsPlaying(true)
		} else {
			audio.pause()
			setIsPlaying(false)
		}
	}

	const handleEnded = () => {
		setIsPlaying(false)
	}

	return (
		<div className='relative flex items-center justify-center w-full h-full rounded-[30px] overflow-hidden bg-black'>
			<audio
				ref={audioRef}
				src={`${NEXT_PUBLIC_API_URL}${audioUrl}`}
				preload='auto'
				onEnded={handleEnded}
			/>

			<DownloadButton
				className='absolute left-3 top-3 z-20'
				href={`${NEXT_PUBLIC_API_URL}${audioUrl}`}
				fileName={`Generated-${Date.now()}.mp3`}
			/>

			<button
				onClick={togglePlay}
				className={cn(
					'absolute left-1/2 top-1/2 flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-md border border-white/5 hover:bg-white/10 transition-all duration-300 ease-in-out pointer-events-auto z-20 py-4 px-4 -translate-x-1/2 -translate-y-[60%]'
				)}
			>
				<Image
					src={isPlaying ? '/icons/pause.svg' : '/icons/play.svg'}
					alt='Play Icon'
					width={24}
					height={24}
				/>
			</button>

			<Image
				src={posterUrl ? posterUrl : '/audio-preview.jpg'}
				alt='Audio Preview'
				width={300}
				height={300}
				loading='lazy'
				quality={100}
				className='absolute w-full h-full m-auto object-cover opacity-40'
			/>

			<span className='absolute bottom-3 left-3 z-20 text-white text-sm'>
				{new Date(createdAt).toLocaleString()}
			</span>
		</div>
	)
}
