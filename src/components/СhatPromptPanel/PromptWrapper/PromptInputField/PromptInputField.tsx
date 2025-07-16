import { motion, useWillChange } from 'framer-motion'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { handleVibrate } from 'utils/handleVibrate'

interface PromptInputFieldProps {
	onToggle?: (isExpanded: boolean) => void
	maxExpandedHeight?: number
	minHeight?: number
	maxHeight?: number
}

export const PromptInputField = forwardRef<{ toggleExpand: () => void }, PromptInputFieldProps>(
	({ onToggle, maxExpandedHeight = 450, minHeight = 40, maxHeight = 300 }, ref) => {
		const textareaRef = useRef<HTMLTextAreaElement>(null)
		const [isExpanded, setIsExpanded] = useState(false)
		const [height, setHeight] = useState<number | string>(minHeight)
		const willChange = useWillChange()
		const [keyboardVisible, setKeyboardVisible] = useState(false)

		useEffect(() => {
			const handleResize = () => {
				if (!window.visualViewport) return

				const viewportHeight = window.visualViewport.height
				const screenHeight = window.innerHeight
				const keyboardHeight = screenHeight - viewportHeight

				setKeyboardVisible(keyboardHeight > screenHeight * 0.15)

				if (
					keyboardHeight > screenHeight * 0.15 &&
					document.activeElement === textareaRef.current
				) {
					const newHeight = Math.min(viewportHeight * 0.4, maxHeight)
					setHeight(newHeight)
				}
			}

			window.visualViewport?.addEventListener('resize', handleResize)
			return () => window.visualViewport?.removeEventListener('resize', handleResize)
		}, [maxHeight])

		const handleInput = () => {
			if (!textareaRef.current || isExpanded) return

			const el = textareaRef.current
			el.style.height = 'auto'
			const scrollHeight = el.scrollHeight

			const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight)
			setHeight(newHeight)
		}

		const handleFocus = () => {
			if (keyboardVisible && !isExpanded) {
				const visualViewportHeight = window.visualViewport?.height ?? maxHeight
				const newHeight = Math.min(visualViewportHeight * 0.4, maxHeight)
				setHeight(newHeight)
			}
		}

		const handleBlur = () => {
			if (!isExpanded) {
				setHeight(minHeight)
			}
		}

		useImperativeHandle(ref, () => ({
			toggleExpand: () => {
				handleVibrate('light', 100)

				setIsExpanded(prev => {
					const newState = !prev
					onToggle?.(newState)
					setHeight(newState ? maxExpandedHeight : minHeight)

					if (!newState) {
						setTimeout(() => {
							if (textareaRef.current) {
								textareaRef.current.style.height = 'auto'
								handleInput()
							}
						}, 10)
					}
					return newState
				})
			}
		}))

		return (
			<motion.textarea
				ref={textareaRef}
				onInput={handleInput}
				onFocus={handleFocus}
				onBlur={handleBlur}
				className='w-full resize-none pl-2 pr-2 py-1 text-base text-white placeholder:text-white/40 bg-transparent focus:outline-none focus:ring-0'
				placeholder='Составьте промпт запрос'
				rows={1}
				animate={{ height }}
				transition={{
					duration: 0.3,
					ease: 'easeInOut',
					bounce: 0.1
				}}
				style={{
					overflowY: height === 'auto' ? 'hidden' : 'auto',
					willChange
				}}
			/>
		)
	}
)

PromptInputField.displayName = 'PromptInputField'
