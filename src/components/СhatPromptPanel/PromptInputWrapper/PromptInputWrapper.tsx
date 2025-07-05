import { ExpandInputButton } from './ExpandInputButton/ExpandInputButton'
import { PromptInputField } from './PromptInputField/PromptInputField'

export const PromptInputWrapper = () => {
	return (
		<div className='relative flex flex-col gap-2 mt-auto w-full min-h-20 backdrop-blur-[30px] bg-dark-bg-transparency-8 rounded-[24px] p-2'>
			<PromptInputField />
			<ExpandInputButton />
			filters
		</div>
	)
}
