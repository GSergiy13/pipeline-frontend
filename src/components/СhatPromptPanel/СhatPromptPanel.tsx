import { PromptGenerateButton } from './PromptGenerateButton/PromptGenerateButton'
import { PromptInputWrapper } from './PromptInputWrapper/PromptInputWrapper'
import { UserInfoPanel } from './UserInfoPanel/UserInfoPanel'

export const ChatPromptPanel = () => {
	return (
		<div className=' absolute bottom-5 left-0 flex flex-col mt-auto w-full z-40 transition-all duration-150'>
			<UserInfoPanel />
			<PromptInputWrapper />

			<PromptGenerateButton />
		</div>
	)
}
