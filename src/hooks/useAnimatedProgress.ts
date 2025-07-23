import { useEffect, useState } from 'react'

export function useAnimatedProgress(progress: number, dragging: boolean) {
	const [animated, setAnimated] = useState(progress)

	useEffect(() => {
		if (dragging) return

		let frame = 0
		const tick = () => {
			setAnimated(prev => {
				const delta = progress - prev
				if (Math.abs(delta) < 0.1) return progress
				return prev + delta * 0.1
			})
			frame = requestAnimationFrame(tick)
		}

		tick()
		return () => cancelAnimationFrame(frame)
	}, [progress, dragging])

	useEffect(() => {
		if (!dragging) {
			setAnimated(progress)
		}
	}, [dragging, progress])

	return dragging ? progress : animated
}
