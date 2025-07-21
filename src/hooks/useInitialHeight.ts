import { useLayoutEffect, useState } from 'react'

export function useInitialHeight<T extends HTMLElement = HTMLElement>(
	ref: React.RefObject<T | null>,
	fallback = 0
) {
	const [height, setHeight] = useState(fallback)

	useLayoutEffect(() => {
		const el = ref.current
		console.log('useInitialHeight', el, el?.offsetHeight)
		if (el) setHeight(el.offsetHeight)
	}, [])

	return height
}
