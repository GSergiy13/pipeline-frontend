import Image from 'next/image'

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
	return (
		<a
			href={`${process.env.NEXT_PUBLIC_API_URL}/${href}`}
			download={fileName}
			className={`${className} py-2 px-3 flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/5 pointer-events-auto`}
			onClick={e => e.stopPropagation()}
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
