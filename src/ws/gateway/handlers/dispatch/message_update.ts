import store from "../../../../store";
import {addMessage} from "../../../../states/messages";
import {Message} from "../../../../types/message";

export interface MessageUpdateHandlerData extends Message {
}

export default function messageUpdateHandler(data: MessageUpdateHandlerData) {
    store.dispatch(addMessage(data));
}