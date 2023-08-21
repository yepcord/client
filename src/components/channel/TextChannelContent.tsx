import TextChannelInputPanel from "./TextChannelInputPanel";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import ApiClient from "../../api/client";
import {Message} from "../../types/message";
import {addMessage} from "../../states/messages";
import {useEffect, useRef} from "react";
import BaseMessage from "./messages/BaseMessage";

export default function TextChannelContent() {
    const channel = useSelector((state: RootState) => state.channel.selectedChannel);
    const messages = useSelector((state: RootState) => channel ? state.messages.messages[channel.id] : {});
    const dispatch = useDispatch();
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        channel && ApiClient.getMessages(channel.id).then((resp) => {
            if (resp.status !== 200) return;
            for (let message of resp.body as Message[])
                dispatch(addMessage(message));
        });
    }, [channel]);

    useEffect(() => {
        messages && bottomRef.current?.scrollIntoView({behavior: "smooth", block: "end"});
    }, [messages]);

    const getMessages = () => {
        let messages_sorted = Object.values(messages);
        messages_sorted.sort((a, b) => {
            let _a = BigInt(a.id);
            let _b = BigInt(b.id);
            return _a < _b ? -1 : _a > _b ? 1 : 0;
        });
        return messages_sorted.map((message, idx) => {
            return <BaseMessage message={message} previous_message={idx ? messages_sorted[idx-1] : null}/>;
        })
    }

    return (
        <div className="channel-content">
            <div className="channel-messages">
                <p style={{ color: "white" }}><b>TODO: add header</b></p>
                {messages && getMessages()}
                <div ref={bottomRef}/>
            </div>
            <TextChannelInputPanel/>
        </div>
    );
}
