'use client'

import { useSelectedModel } from 'hooks/useSelectedModel'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelected } from 'store/slices/controlPanelSlice'
import type { RootState } from 'store/store'
import { debounce } from 'utils/debounce'

export const AddRowsCustom = () => {
	const dispatch = useDispatch()
	const selectModel = useSelectedModel()

	const isCustomMode = useSelector((state: RootState) => state.controlPanel.selected.customModel)
	const isInstrumental = useSelector((state: RootState) => state.controlPanel.selected.instrumental)

	const globalTitle =
		useSelector((state: RootState) => state.controlPanel.selected.titleAudio) ?? ''
	const globalLyrics =
		useSelector((state: RootState) => state.controlPanel.selected.lyricsAudio) ?? ''

	const [titleLocal, setTitleLocal] = useState(globalTitle)
	const [lyricsLocal, setLyricsLocal] = useState(globalLyrics)

	useEffect(() => {
		setTitleLocal(globalTitle)
	}, [globalTitle])

	useEffect(() => {
		setLyricsLocal(globalLyrics)
	}, [globalLyrics])

	const debouncedTitleUpdate = useRef(
		debounce((val: string) => {
			dispatch(setSelected({ key: 'titleAudio', value: val }))
		}, 500)
	).current

	const debouncedLyricsUpdate = useRef(
		debounce((val: string) => {
			dispatch(setSelected({ key: 'lyricsAudio', value: val }))
		}, 500)
	).current

	const handleTitleRowChange = (value: string) => {
		setTitleLocal(value)
		debouncedTitleUpdate(value)
	}

	const handleLyricsRowChange = (value: string) => {
		setLyricsLocal(value)
		debouncedLyricsUpdate(value)
	}

	if (selectModel?.type_generation !== 'text-audio' || !isCustomMode) return null

	return (
		<div className='absolute top-0 left-0 right-0 flex flex-col gap-1 -translate-y-[110%]'>
			<div className='py-2 px-3 backdrop-blur-[30px] bg-[#232327] rounded-[24px]'>
				<input
					type='text'
					value={titleLocal}
					onChange={e => handleTitleRowChange(e.target.value)}
					placeholder='Введите заголовок'
					className='w-full bg-transparent text-white placeholder:text-gray-400 rounded focus:outline-none placeholder:text-sm text-base resize-none'
				/>
			</div>

			{!isInstrumental && (
				<div className='py-2 px-3 backdrop-blur-[30px] min-h-[90px] bg-[#232327] rounded-[24px]'>
					<textarea
						value={lyricsLocal}
						onChange={e => handleLyricsRowChange(e.target.value)}
						placeholder='Напишите свою собственную лирику, два куплета (8 строк) для достижения наилучшего результата'
						className='w-full h-full bg-transparent text-white placeholder:text-gray-400 rounded focus:outline-none placeholder:text-sm text-base resize-none'
						rows={3}
					/>
				</div>
			)}
		</div>
	)
}
