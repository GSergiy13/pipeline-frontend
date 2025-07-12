import { OPTION_SELECT } from 'constants/optionselect.const'
import Image from 'next/image'

import { OptionSelect } from '@/ui/OptionSelect/OptionSelect'

interface PromptSettingsRowProps {
	onFileSelect: (file: File) => void
}

export const PromptSettingsRow = ({ onFileSelect }: PromptSettingsRowProps) => {
	const handleAttachClick = () => {
		const input = document.createElement('input')
		input.type = 'file'
		input.accept = 'image/*'
		input.onchange = e => {
			const file = (e.target as HTMLInputElement).files?.[0]
			if (file) {
				onFileSelect(file)
			}
		}
		input.click()
	}

	return (
		<div className='flex items-center justify-between gap-1'>
			<button
				onClick={handleAttachClick}
				className='flex items-center justify-center w-[30px] h-[30px] rounded-full border border-dark-bg-transparency-12 bg-dark-bg-transparency-4'
			>
				<Image
					src={'/icons/attach.svg'}
					alt='Plus Icon'
					width={20}
					height={20}
				/>
			</button>

			<div className=' flex items-center gap-1'>
				<OptionSelect data={OPTION_SELECT} />
			</div>
		</div>
	)
}
