'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from 'store/store'
import { initializeTelegram } from 'utils/telegramUtils'

export const TelegramInitializer = () => {
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		try {
			initializeTelegram(dispatch)
		} catch (error) {}
	}, [dispatch])

	return null
}
