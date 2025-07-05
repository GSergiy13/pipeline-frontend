import { PromptGenerateButton } from './PromptGenerateButton/PromptGenerateButton'
import { PromptInputWrapper } from './PromptInputWrapper/PromptInputWrapper'
import { UserInfoPanel } from './UserInfoPanel/UserInfoPanel'

export const ChatPromptPanel = () => {
	return (
		<div className='flex flex-col mt-auto w-full'>
			<UserInfoPanel />
			<PromptInputWrapper />

			<PromptGenerateButton />
		</div>
	)
}
