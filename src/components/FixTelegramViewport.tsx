'use client'

import { useEffect } from 'react'

export const FixTelegramViewport = () => {
	useEffect(() => {
		const tg = window.Telegram?.WebApp
		if (!tg) return

		const height = tg.viewportHeight || window.innerHeight
		const root = document.documentElement

		root.style.setProperty('--tg-viewport-height', `${height}px`)
		root.style.setProperty('--tg-viewport-stable-height', `${height}px`)
	}, [])

	return null
}
