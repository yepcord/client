import store from "../../../../store";
import {addMessage, removeMessage} from "../../../../states/messages";
import {Message} from "../../../../types/message";

export interface MessageCreateHandlerData extends Message {
}

export default function messageCreateHandler(data: MessageCreateHandlerData) {
    if (data.nonce)
        store.dispatch(removeMessage({id: data.nonce, channel_id: data.channel_id}));
    store.dispatch(addMessage(data));
}