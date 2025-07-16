import cn from 'clsx'
import Image from 'next/image'
import type { ModelGenerateItem } from 'types/ModelGenerate.type'

interface DropDownListProps {
	show: boolean
	data: ModelGenerateItem[]
	active: ModelGenerateItem
	handleSelect: (item: ModelGenerateItem) => void
}
export const DropDownList = ({ data, show, active, handleSelect }: DropDownListProps) => {
	return (
		<ul
			className={cn(
				`absolute flex flex-col top-11 w-full rounded-xl bg-dark-bg-transparency-8 backdrop-blur-[30px] will-change-transform transform-gpu z-50 transition-all duration-400 overflow-hidden max-h-[60vh] overflow-y-auto`,
				{
					'pointer-events-auto opacity-100 translate-y-0': show == true,
					'pointer-events-none opacity-0 -translate-y-3': show == false
				}
			)}
		>
			{data.map(item => (
				<li
					key={item.id}
					className={cn(
						'w-full flex items-start gap-2 p-2 hover:bg-dark-bg-transparency-12 transition-colors duration-200',
						{
							'bg-dark-bg-transparency-12': active.id == item.id
						}
					)}
					onClick={() => handleSelect(item)}
					role='option'
					aria-selected={active.id === item.id}
				>
					<Image
						src={`/models/${item.type}.svg`}
						width={16}
						height={16}
						className='mt-0.5'
						alt='Model logo'
					/>

					<div className='flex flex-col gap-1'>
						<span className='text-sm'>{item.name}</span>

						{item.price !== 0 && (
							<div className='flex items-center gap-0.5'>
								<Image
									src={'/icons/flame.svg'}
									width={12}
									height={12}
									alt='Model logo'
								/>
								<span className='text-xs'>{item.price}</span>
							</div>
						)}
					</div>
				</li>
			))}
		</ul>
	)
}
