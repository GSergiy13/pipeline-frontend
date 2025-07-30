import { ModelConfigurations } from 'constants/modelconfigurations.const'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectModelId } from 'store/slices/controlPanelSlice'

export const useSelectedModel = () => {
	const modelId = useSelector(selectModelId)
	return useMemo(() => ModelConfigurations.find(m => m.id === modelId) ?? null, [modelId])
}
