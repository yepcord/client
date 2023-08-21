import store from "../../../../store";
import {addMessage} from "../../../../states/messages";
import {Message} from "../../../../types/message";

export interface MessageCreateHandlerData extends Message {
}

export default function messageCreateHandler(data: MessageCreateHandlerData) {
    store.dispatch(addMessage(data));
}