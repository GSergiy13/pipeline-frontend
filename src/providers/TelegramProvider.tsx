'use client'

import React, { useEffect } from 'react'
import { initializeTelegram } from 'utils/telegramUtils'

// import { useDispatch } from 'react-redux'

// import { initializeTelegram } from '@/utils/telegramUtils'

const TelegramProvider = ({ children }: { children: React.ReactNode }) => {
	// const dispatch = useDispatch()

	useEffect(() => {
		try {
			initializeTelegram()
		} catch (error) {}
	}, [])

	return <>{children}</>
}

export default TelegramProvider
