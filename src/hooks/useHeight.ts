import { useEffect, useState } from 'react'

export function useHeight<T extends HTMLElement = HTMLElement>(
	ref: React.RefObject<T | null>,
	fallback = 0
) {
	const [height, setHeight] = useState(fallback)

	useEffect(() => {
		const el = ref.current
		if (!el) return

		const update = () => setHeight(el.offsetHeight)
		update()

		const ro = new ResizeObserver(update)
		ro.observe(el)

		return () => ro.disconnect()
	}, [ref])

	return height
}
