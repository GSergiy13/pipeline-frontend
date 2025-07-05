import type { OptionSelectType } from 'constants/optionselect.const'
import Image from 'next/image'

interface OptionSelectProps {
	data: OptionSelectType
}

export const OptionSelect = ({ data }: OptionSelectProps) => {
	return (
		<>
			{Object.entries(data).map(([key, group]) => (
				<div
					className='relative flex gap-2 items-center justify-center p-2 h-[30px] w-auto rounded-full border border-dark-bg-transparency-12 bg-dark-bg-transparency-4'
					key={key}
				>
					<Image
						src={group.icon}
						alt='Plus Icon'
						width={20}
						height={20}
					/>
					<span>{group.options[0].name}</span>

					{/* <OptionSelectList group={group} /> */}
				</div>
			))}
		</>
	)
}
