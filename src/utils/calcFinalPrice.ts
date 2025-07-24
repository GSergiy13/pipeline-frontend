import type { SelectedParams } from 'store/slices/generationSlice'
import type { ModelConfigurationsItem } from 'types/ModelConfigurations.type'

const ORDER_BASE = 0.2
const ORDER_STEP = 0.1

const getOrderedMultiplier = <T>(
	value: T | undefined,
	list: T[] | undefined,
	base = ORDER_BASE,
	step = ORDER_STEP,
	mode: 'plus' | 'direct' = 'plus'
) => {
	if (!value || !list) return 1
	const i = list.findIndex(v => v === value)
	if (i === -1) return 1

	return mode === 'plus' ? 1 + base + step * i : base + step * i
}

export const calcPrice = (
	model: ModelConfigurationsItem | null,
	params: SelectedParams
): number => {
	if (!model) return 0

	let price = model.price ?? 0

	if (model.options?.quantity && typeof params.quantity === 'number') {
		price *= params.quantity

		const quantityValues = model.options.quantity.options?.map(o => o.value) as number[] | undefined
		const qMul = getOrderedMultiplier(params.quantity, quantityValues)
		price *= qMul
	}

	if (model.options?.quality && params.quality) {
		const qualityValues = model.options.quality.options?.map(o => o.value) as string[] | undefined
		const qualMul = getOrderedMultiplier(params.quality, qualityValues)
		price *= qualMul
	}

	if (model.options?.duration && typeof params.duration === 'number') {
		const durationValues = model.options.duration.options?.map(o => o.value) as number[] | undefined
		const durMul = getOrderedMultiplier(params.duration, durationValues)
		price *= durMul
	}

	return +price.toFixed(2)
}
