import { useRef, useState } from 'react'

import { ExpandInputButton } from './ExpandInputButton/ExpandInputButton'
import { PromptInputField } from './PromptInputField/PromptInputField'

export const PromptInputWrapper = () => {
	const inputRef = useRef<{ toggleExpand: () => void }>(null)
	const [isExpanded, setIsExpanded] = useState(false)

	const handleExpand = () => {
		inputRef.current?.toggleExpand()
		setIsExpanded(prev => !prev)
	}

	return (
		<div className='relative flex flex-col gap-2 mt-auto w-full min-h-20 backdrop-blur-[30px] bg-dark-bg-transparency-8 rounded-[24px] p-2'>
			<PromptInputField ref={inputRef} />
			<ExpandInputButton
				onExpand={handleExpand}
				isExpanded={isExpanded}
			/>
			filters
		</div>
	)
}
