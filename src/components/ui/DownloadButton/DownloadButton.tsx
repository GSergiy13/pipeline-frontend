'use client'

import { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_BASE_URL } from 'constants/CONST_API'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface DownloadButtonProps {
	className?: string
	href: string
	fileName?: string
}

export const DownloadButton = ({
	className,
	href,
	fileName = 'video.mp4'
}: DownloadButtonProps) => {
	const [isTelegramWebApp, setIsTelegramWebApp] = useState(false)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setIsTelegramWebApp(
				typeof window.Telegram !== 'undefined' && !!window.Telegram.WebApp?.initData
			)
		}
	}, [])

	const downloadProxyUrl = `${NEXT_PUBLIC_BASE_URL}/api/download?url=${encodeURIComponent(
		`${href}`
	)}&filename=${encodeURIComponent(fileName)}`

	console.log(`${NEXT_PUBLIC_API_URL}${href}`)

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.stopPropagation()

		if (isTelegramWebApp && typeof window.Telegram?.WebApp?.downloadFile === 'function') {
			e.preventDefault()
			window.Telegram.WebApp.downloadFile(
				{
					url: `${NEXT_PUBLIC_API_URL}${href}`,
					file_name: fileName
				},
				(accepted: boolean) => {
					if (accepted) {
						console.log('📥 User accepted download')
					} else {
						console.warn('❌ User canceled download')
					}
				}
			)
		}
		// else → default anchor behavior for desktop & browsers
	}

	return (
		<a
			href={downloadProxyUrl}
			download={fileName}
			className={`${className} py-2 px-3 flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/5 pointer-events-auto`}
			onClick={handleClick}
		>
			<Image
				src='/icons/download.svg'
				alt='Download Icon'
				width={16}
				height={16}
			/>
		</a>
	)
}
