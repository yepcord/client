import TextChannelInputPanel from "./TextChannelInputPanel";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import ApiClient from "../../api/client";
import {Message} from "../../types/message";
import {addMessage, setAllLoaded} from "../../states/messages";
import {useEffect, useRef, useState} from "react";
import BaseMessage from "./messages/BaseMessage";

export default function TextChannelContent() {
    const channel = useSelector((state: RootState) => state.channel.selectedChannel);
    const messages = useSelector((state: RootState) => channel ? state.messages.messages[channel.id] : {});
    const info = useSelector((state: RootState) => channel ? state.messages.info[channel.id] : {all: false, minimal: null});
    const dispatch = useDispatch();
    const bottomRef = useRef<HTMLDivElement>(null);
    const messagesRef = useRef<HTMLDivElement>(null);
    const [isLoading, setLoading] = useState(false);
    const [isInit, setInit] = useState(false);

    const fetchMessages = (before?: string | null) => {
        if(info?.all) return;
        setLoading(true);
        return new Promise((resolve) => {
            ApiClient.getMessages(channel!.id, before).then((resp) => {
                if (resp.status !== 200) return;
                for (let message of resp.body as Message[])
                    dispatch(addMessage(message));

                resolve((resp.body as Message[]).length);
                setLoading(false);
            });
        })
    };

    useEffect(() => {
        setInit(false);
        channel && fetchMessages(null)?.then(() => setInit(true));
    }, [channel]);

    useEffect(() => {
        messages && bottomRef.current?.scrollIntoView({behavior: "smooth", block: "end"});
    }, [messages]);

    const handleScroll = () => {
        const t = messagesRef.current;
        if (t?.scrollHeight! + t?.scrollTop! - t?.offsetHeight! > 360 || isLoading || !isInit) {
            return;
        }
        fetchMessages(info.minimal)?.then(count => {
            if(count === 0)
                dispatch(setAllLoaded(channel!.id))
        });
    }

    const getMessages = () => {
        let messages_sorted = Object.values(messages);
        messages_sorted.sort((a, b) => {
            let _a = BigInt(a.id);
            let _b = BigInt(b.id);
            return _a < _b ? -1 : _a > _b ? 1 : 0;
        });
        return messages_sorted.map((message, idx) => {
            return <BaseMessage message={message} previous_message={idx ? messages_sorted[idx-1] : null}/>;
        }).reverse();
    }

    return (
        <div className="channel-content">
            <div className="channel-messages" onScroll={handleScroll} ref={messagesRef}>
                <div ref={bottomRef}/>
                {messages && getMessages()}
                <p style={{ color: "white" }}><b>TODO: add header</b></p>
            </div>
            <TextChannelInputPanel/>
        </div>
    );
}
