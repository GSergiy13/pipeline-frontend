import type { OptionGroup } from 'types/ModelConfigurations.type'

export function sanitizeOptionGroups(
	input: Record<string, OptionGroup | null | undefined>
): Record<string, OptionGroup> {
	return Object.fromEntries(
		Object.entries(input).filter(([_, v]) => v !== null && v !== undefined)
	) as Record<string, OptionGroup>
}
