import { IMessage } from '../../../definition/IMessage';
import { TranslationKey } from '../../../client/contexts/TranslationContext';

type MessageType = {
	id: string;
	system?: boolean;
	/* deprecated */
	render?: (message: IMessage) => string;
	/* deprecated */
	template?: (message: IMessage) => unknown;
	message: TranslationKey;
	data?: (message: IMessage) => Record<string, string | undefined>;
};

class MessageTypesClass {
	private types = new Map<string, MessageType>();

	registerType(options: MessageType): MessageType {
		if ('render' in options) {
			console.warn('MessageType.render is deprecated. Use MessageType.message instead.', options.id);
		}
		if ('template' in options) {
			console.warn('MessageType.template is deprecated. Use MessageType.message instead.', options.id);
		}
		this.types.set(options.id, options);
		return options;
	}

	getType(message: IMessage): MessageType | undefined {
		return message && message.t && this.types.get(message.t);
	}

	isSystemMessage(message: IMessage): boolean {
		const type = this.getType(message);
		return Boolean(type && type.system);
	}
}
export const MessageTypes = new MessageTypesClass();
