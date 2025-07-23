import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from 'store/store'

export const AddRowsCustom = () => {
	const dispatch = useDispatch()
	const generationSetting = useSelector((state: RootState) => state.generation)
	const isCustomMode = useSelector(
		(state: RootState) => state.generation.selectedParams.custom_model
	)

	const handleTitleRowChange = (value: string) => {}

	const handleLyricsRowChange = (value: string) => {}

	return generationSetting.selectedModel?.type_generation === 'text-audio' && isCustomMode ? (
		<div className='absolute top-0 left-0 right-0 flex flex-col gap-1 -translate-y-[150px]'>
			<div className='py-2 px-3 backdrop-blur-[30px] bg-[#232327] rounded-[24px] '>
				<input
					type='text'
					placeholder='Введите заголовок'
					className='w-full  bg-transparent text-white placeholder:text-gray-400 rounded focus:outline-none placeholder:text-sm text-base resize-none'
				/>
			</div>
			<div className='py-2 px-3 backdrop-blur-[30px] min-h-[90px] bg-[#232327] rounded-[24px] '>
				<textarea
					placeholder='Напишите свою собственную лирику, два куплета (8 строк) для достижения наилучшего результата'
					className='w-full h-full bg-transparent text-white placeholder:text-gray-400 rounded focus:outline-none placeholder:text-sm text-base resize-none'
					rows={3}
				></textarea>

				{/* style */}
			</div>
		</div>
	) : null
}
