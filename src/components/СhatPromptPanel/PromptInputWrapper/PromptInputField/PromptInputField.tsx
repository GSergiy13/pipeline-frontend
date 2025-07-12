'use client'

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

		/* ---------- helpers ---------- */
		const isKeyboardOpen = (vv: VisualViewport) =>
			typeof window !== 'undefined' && window.innerHeight - vv.height > 100 // >100 px — гарантовано клавіатура

		/**
		 * Повертає "стабілізований" VisualViewport (кадр через requestAnimationFrame),
		 * але викликає колбек лише у браузері.
		 */
		const getStableViewport = (cb: (vv: VisualViewport) => void) => {
			if (typeof window === 'undefined' || !window.visualViewport) return

			let raf = 0
			const exec = () => {
				const vv = window.visualViewport
				if (vv) cb(vv)
			}

			cancelAnimationFrame(raf)
			raf = window.requestAnimationFrame(exec)
		}

		/* ---------- viewport listener ---------- */
		useEffect(() => {
			if (typeof window === 'undefined' || !window.visualViewport) return

			const handleGeometry = () => {
				getStableViewport(vv => {
					const keyboard = isKeyboardOpen(vv)

					if (keyboard && document.activeElement === textareaRef.current && !isExpanded) {
						setHeight(Math.min(vv.height * 0.4, maxHeight))
					}

					// коли клавіатура закрилась і ми не у розгорнутому режимі
					if (!keyboard && !isExpanded) {
						setHeight(minHeight)
					}
				})
			}

			window.visualViewport.addEventListener('geometrychange', handleGeometry)
			return () => {
				if (window.visualViewport) {
					window.visualViewport.removeEventListener('geometrychange', handleGeometry)
				}
			}
		}, [isExpanded, maxHeight, minHeight])

		/* ---------- textarea auto-grow ---------- */
		const autoGrow = () => {
			const el = textareaRef.current
			if (!el || isExpanded) return
			el.style.height = 'auto'
			setHeight(Math.min(Math.max(el.scrollHeight, minHeight), maxHeight))
		}

		/* ---------- imperative handle ---------- */
		useImperativeHandle(ref, () => ({
			toggleExpand: () => {
				handleVibrate('light', 100)
				setIsExpanded(prev => {
					const next = !prev
					onToggle?.(next)
					setHeight(next ? maxExpandedHeight : minHeight)
					if (!next) requestAnimationFrame(autoGrow)
					return next
				})
			}
		}))

		/* ---------- render ---------- */
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
					style={{ height: 'auto', maxHeight, overflowY: 'auto' }}
					onInput={autoGrow}
					onFocus={autoGrow}
					onBlur={() => !isExpanded && setHeight(minHeight)}
				/>
			</motion.div>
		)
	}
)

PromptInputField.displayName = 'PromptInputField'
