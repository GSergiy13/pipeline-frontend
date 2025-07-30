import { useMemo } from 'react'
import type { ControlPanelState } from 'store/slices/controlPanelSlice'
import type { ModelConfigurationsItem } from 'types/ModelConfigurations.type'
import { calcPrice } from 'utils/calcFinalPrice'

export const usePrice = (
	model: ModelConfigurationsItem | null,
	params: ControlPanelState['selected']
) =>
	useMemo(
		() => calcPrice(model, params),
		[model?.id, model?.price, params.quantity, params.duration, params.quality, params.instrumental]
	)
