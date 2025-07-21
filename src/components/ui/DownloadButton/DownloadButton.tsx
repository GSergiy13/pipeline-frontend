import { NEXT_PUBLIC_BASE_URL } from 'constants/CONST_API'
import Image from 'next/image'

interface DownloadButtonProps {
	className?: string
	href: string // <- raw endpoint, e.g. downloadUrl
	fileName?: string
}

export const DownloadButton = ({
	className,
	href,
	fileName = 'video.mp4'
}: DownloadButtonProps) => {
	const downloadProxyUrl = `${NEXT_PUBLIC_BASE_URL}/api/download?url=${encodeURIComponent(
		`${process.env.NEXT_PUBLIC_API_URL}/${href}`
	)}&filename=${encodeURIComponent(fileName)}`

	return (
		<a
			href={downloadProxyUrl}
			className={`${className} py-2 px-3 flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/5 pointer-events-auto`}
			onClick={e => e.stopPropagation()}
			download // still helps on desktop
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
