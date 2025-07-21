// utils/calcPrice.ts
import type { SelectedParams } from 'store/slices/generationSlice'
import type { ModelConfigurationsItem } from 'types/ModelConfigurations.type'

export const calcPrice = (model: ModelConfigurationsItem | null, params: SelectedParams) => {
	if (!model) return 0
	let price = model.price ?? 0

	if (model.options?.quantity && params.quantity) price *= params.quantity

	// приклад надбавки за високу якість
	if (model.options?.quality && params.quality === 'high') price *= 1.5

	return price
}
