// hooks/usePrice.ts
import { useMemo } from 'react'
import type { SelectedParams } from 'store/slices/generationSlice'
import type { ModelConfigurationsItem } from 'types/ModelConfigurations.type'
import { calcPrice } from 'utils/calcFinalPrice'

export const usePrice = (model: ModelConfigurationsItem | null, params: SelectedParams) =>
	useMemo(() => calcPrice(model, params), [model, params.quantity, params.duration, params.quality])
