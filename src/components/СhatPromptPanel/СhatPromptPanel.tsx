import { PromptGenerateButton } from './PromptGenerateButton/PromptGenerateButton'
import { PromptInputWrapper } from './PromptInputWrapper/PromptInputWrapper'
import { UserInfoPanel } from './UserInfoPanel/UserInfoPanel'

export const ChatPromptPanel = () => {
	return (
		<div className=' relative bottom-6 flex flex-col mt-auto w-full z-40 transition-all duration-150 max-w-[640px] mx-auto left-1/2 -translate-x-1/2'>
			<UserInfoPanel />
			<PromptInputWrapper />
			<PromptGenerateButton />
		</div>
	)
}
