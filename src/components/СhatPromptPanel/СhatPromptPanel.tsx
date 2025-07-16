import { PromptGenerateButton } from './PromptGenerateButton/PromptGenerateButton'
import { PromptWrapper } from './PromptWrapper/PromptWrapper'

export const ChatPromptPanel = () => {
	return (
		<div className='absolute bottom-0 flex flex-col mt-auto w-full z-40 transition-all duration-150 max-w-[640px] mx-auto left-1/2 -translate-x-1/2 px-3'>
			{/* <UserInfoPanel /> */}
			<PromptWrapper />
			<PromptGenerateButton />
		</div>
	)
}
