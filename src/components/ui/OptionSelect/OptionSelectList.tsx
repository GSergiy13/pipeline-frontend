import cn from 'clsx'
import type { OptionGroup } from 'constants/optionselect.const'

interface OptionSelectListProps {
	group: OptionGroup
}

export const OptionSelectList = ({ group }: OptionSelectListProps) => {
	const activeGroup = group.name === 'Quality'

	console.log('OptionSelectList rendered for group:', activeGroup)

	return (
		<div
			key={group.name}
			className={cn(
				'absolute bottom-10 right-0 w-full bg-dark-bg-transparency-4 rounded-xl min-w-[190px] p-3 z-50',
				{
					hidden: !activeGroup,
					block: activeGroup
				}
			)}
		>
			<h3 className='text-lg font-semibold mb-2'>{group.name}</h3>
			<ul>
				{group.options.map(option => (
					<li key={option.id}>{option.name}</li>
				))}
			</ul>
		</div>
	)
}
