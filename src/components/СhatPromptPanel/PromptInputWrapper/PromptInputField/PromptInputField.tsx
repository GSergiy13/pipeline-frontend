import { motion } from 'framer-motion'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { handleVibrate } from 'utils/handleVibrate'

interface PromptInputFieldProps {
	onToggle?: (isExpanded: boolean) => void
}

export const PromptInputField = forwardRef<{ toggleExpand: () => void }, PromptInputFieldProps>(
	({ onToggle }, ref) => {
		const textareaRef = useRef<HTMLTextAreaElement>(null)
		const [isExpanded, setIsExpanded] = useState(false)
		const [height, setHeight] = useState<'auto' | number>('auto')

		const handleInput = () => {
			if (!textareaRef.current || isExpanded) return

			const el = textareaRef.current
			el.style.height = 'auto'
			const scrollHeight = el.scrollHeight

			handleVibrate('light', 100)

			if (scrollHeight <= 300) {
				setHeight(scrollHeight)
			} else {
				setHeight(480)
			}
		}

		useImperativeHandle(ref, () => ({
			toggleExpand: () => {
				setIsExpanded(prev => {
					const newState = !prev
					onToggle?.(newState)
					setHeight(newState ? 450 : 'auto')

					if (!newState) {
						setTimeout(() => handleInput(), 10)
					}
					return newState
				})
			}
		}))

		return (
			<motion.textarea
				ref={textareaRef}
				onInput={handleInput}
				className='w-full resize-none pl-2 pr-2 py-1 text-sm text-white placeholder:text-white/40 bg-transparent focus:outline-none focus:ring-0'
				placeholder='Составьте промпт запрос'
				rows={1}
				animate={{ height }}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
				style={{ overflowY: height === 'auto' ? 'hidden' : 'auto' }}
			/>
		)
	}
)

PromptInputField.displayName = 'PromptInputField'
