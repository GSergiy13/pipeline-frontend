import type { OptionGroup } from 'constants/optionselect.const'

interface OptionSelectListProps {
	group: OptionGroup
}

export const OptionSelectList = ({ group }: OptionSelectListProps) => {
	return (
		<ul>
			{group.options.map(option => (
				<li key={option.id}>
					{option.name} – {option.value}
				</li>
			))}
		</ul>
	)
}
