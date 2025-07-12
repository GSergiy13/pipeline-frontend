import { motion, useWillChange } from 'framer-motion'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { handleVibrate } from 'utils/handleVibrate'

interface Props {
	onToggle?: (expanded: boolean) => void
	maxExpandedHeight?: number
	minHeight?: number
	maxHeight?: number
}

type Imperative = { toggleExpand: () => void }

export const PromptInputField = forwardRef<Imperative, Props>(
	({ onToggle, maxExpandedHeight = 450, minHeight = 40, maxHeight = 300 }, ref) => {
		const textareaRef = useRef<HTMLTextAreaElement>(null)
		const willChange = useWillChange()

		const [isExpanded, setIsExpanded] = useState(false)
		const [height, setHeight] = useState<number>(minHeight)
		const [keyboardVisible, setKeyboardVisible] = useState(false)

		/* -------------------------------------------------- helpers */
		const getKeyboardHeight = () => {
			const vv = window.visualViewport
			if (!vv) return 0
			const viewportBottom = vv.height + vv.offsetTop
			return Math.max(0, window.innerHeight - viewportBottom)
		}

		/* -------------------------------------------------- viewport listener */
		useEffect(() => {
			const handleGeometry = () => {
				const kbHeight = getKeyboardHeight()
				setKeyboardVisible(kbHeight > window.innerHeight * 0.15)

				if (kbHeight && document.activeElement === textareaRef.current && !isExpanded) {
					setHeight(Math.min((window.visualViewport?.height ?? maxHeight) * 0.4, maxHeight))
				}
			}

			window.visualViewport?.addEventListener('geometrychange', handleGeometry)
			return () => window.visualViewport?.removeEventListener('geometrychange', handleGeometry)
		}, [isExpanded, maxHeight])

		/* -------------------------------------------------- textarea auto-grow */
		const autoGrow = () => {
			const el = textareaRef.current
			if (!el || isExpanded) return
			el.style.height = 'auto'
			setHeight(Math.min(Math.max(el.scrollHeight, minHeight), maxHeight))
		}

		/* -------------------------------------------------- imperative handle */
		useImperativeHandle(ref, () => ({
			toggleExpand: () => {
				handleVibrate('light', 100)
				setIsExpanded(prev => {
					const next = !prev
					onToggle?.(next)
					setHeight(next ? maxExpandedHeight : minHeight)
					if (!next) {
						requestAnimationFrame(autoGrow)
					}
					return next
				})
			}
		}))

		/* -------------------------------------------------- render */
		return (
			<motion.div
				animate={{ height }}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
				className='w-full'
				style={{ willChange }}
			>
				<textarea
					ref={textareaRef}
					rows={1}
					placeholder='Составьте промпт запрос'
					className='w-full resize-none pl-2 pr-2 py-1 text-sm text-white placeholder:text-white/40
                     bg-transparent focus:outline-none focus:ring-0'
					style={{
						height: 'auto',
						maxHeight,
						overflowY: 'auto'
					}}
					onInput={autoGrow}
					onFocus={autoGrow}
					onBlur={() => !isExpanded && setHeight(minHeight)}
				/>
			</motion.div>
		)
	}
)

PromptInputField.displayName = 'PromptInputField'
