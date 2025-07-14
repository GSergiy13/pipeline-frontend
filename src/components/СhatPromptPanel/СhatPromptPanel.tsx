import { PromptGenerateButton } from './PromptGenerateButton/PromptGenerateButton'
import { PromptInputWrapper } from './PromptInputWrapper/PromptInputWrapper'
import { UserInfoPanel } from './UserInfoPanel/UserInfoPanel'

export const ChatPromptPanel = () => {
	return (
		<div className='absolute bottom-0 flex flex-col mt-auto w-full z-40 transition-all duration-150 max-w-[640px] mx-auto left-1/2 -translate-x-1/2 px-3'>
			<UserInfoPanel />
			<PromptInputWrapper />
			<PromptGenerateButton />
		</div>
	)
}
