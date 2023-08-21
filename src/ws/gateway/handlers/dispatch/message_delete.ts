import store from "../../../../store";
import {removeMessage} from "../../../../states/messages";

export interface MessageDeleteHandlerData {
    id: string,
    channel_id: string,
}

export default function messageDeleteHandler(data: MessageDeleteHandlerData) {
    store.dispatch(removeMessage(data));
}