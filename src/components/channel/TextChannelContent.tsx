import TextChannelInputPanel from "./TextChannelInputPanel";
import {useDispatch, useSelector} from "react-redux";
import store, {RootState} from "../../store";
import ApiClient from "../../api/client";
import {Message, MessageType} from "../../types/message";
import {addMessage, setAllLoaded} from "../../states/messages";
import React, {useEffect, useRef, useState} from "react";
import BaseMessage from "./messages/BaseMessage";
import {ChannelType} from "../../types/channel";
import DmChannelBeginning from "./messages/DmChannelBeginning";
import GuildChannelBeginning from "./messages/GuildChannelBeginning";
import OnlyContentMessage from "./messages/OnlyContentMessage";
import {format, parseISO} from "date-fns";
import {Divider} from "@mui/material";
import TextChannelContentSkeleton from "./messages/TextChannelContentSkeleton";
import UserProfileMenu from "./messages/UserProfileMenu";
import UserJoinMessage from "./messages/UserJoinMessage";
import ThreadCreatedMessage from "./messages/ThreadCreatedMessage";
import {websocketState} from "../../ws/gateway/GatewayWebsocket";
import {GatewayOp} from "../../types/gateway";

export default function TextChannelContent() {
    const channel = useSelector((state: RootState) => state.channel.selectedChannel);
    const messages = useSelector((state: RootState) => channel ? state.messages.messages[channel.id] : {});
    const info = useSelector((state: RootState) => channel ? state.messages.info[channel.id] : {all: false, minimal: null});
    const dispatch = useDispatch();
    const bottomRef = useRef<HTMLDivElement>(null);
    const messagesRef = useRef<HTMLDivElement>(null);
    const [isLoading, setLoading] = useState(false);
    const [isInit, setInit] = useState(false);
    const loadingRef = useRef<HTMLDivElement>(null);

    const fetchMessages = (before?: string | null) => {
        if(info?.all) return;
        setLoading(true);
        return new Promise((resolve) => {
            ApiClient.getMessages(channel!.id, before).then((resp) => {
                if (resp.status !== 200) return;
                for (let message of resp.body as Message[])
                    dispatch(addMessage(message));

                setLoading(false);
                resolve((resp.body as Message[]).length);
            });
        })
    };

    useEffect(() => {
        setInit(false);
        channel && fetchMessages(null)?.then((count) => {
            setInit(true);
            if(count === 0) {
                dispatch(setAllLoaded(channel!.id));
            }
        });
    }, [channel]);

    useEffect(() => {
        messages && bottomRef.current?.scrollIntoView({behavior: "smooth", block: "end"});
    }, [messages]);

    const handleScroll = () => {
        const t = messagesRef.current;

        if (t?.scrollHeight! + t?.scrollTop! - t?.offsetHeight! - 200 - loadingRef.current?.offsetHeight! > 360
            || isLoading || !isInit) {
            return;
        }
        fetchMessages(info.minimal)?.then(count => {
            if(count === 0) {
                dispatch(setAllLoaded(channel!.id));
            }
        });
    }

    const getMessages = () => {
        const isGuild = Boolean(channel?.guild_id);
        const member_ids = isGuild ? Object.keys(store.getState().guild.guilds[channel?.guild_id!].members) : [];
        const request_users: Set<string> = new Set();

        let messages_sorted = Object.values(messages);
        messages_sorted.sort((a, b) => {
            let _a = BigInt(a.id);
            let _b = BigInt(b.id);
            return _a < _b ? -1 : _a > _b ? 1 : 0;
        });

        const result = messages_sorted.map((message, idx) => {
            if(isGuild && !request_users.has(message.author.id) && !member_ids.includes(message.author.id)) request_users.add(message.author.id);

            const prev = idx ? messages_sorted[idx-1] : null;
            const date = parseISO(message.timestamp);
            const sameDay = prev ? parseISO(prev.timestamp).getDate() === date.getDate() : true;
            const sameAuthor = sameDay ? prev?.author.id === message.author.id : false;
            let ret;
            switch (message.type) {
                case MessageType.DEFAULT: {
                    ret = sameAuthor ? <OnlyContentMessage message={message}/> : <BaseMessage message={message}/>;
                    break;
                }
                case MessageType.USER_JOIN: {
                    ret = <UserJoinMessage message={message}/>;
                    break;
                }
                case MessageType.THREAD_CREATED: {
                    ret = <ThreadCreatedMessage message={message}/>;
                    break;
                }
            }
            if(!sameDay) {
                ret = (<>
                    {ret}
                    <Divider flexItem sx={{borderBottomWidth: "2px", color: "#adadad", margin: "0 20px", fontSize: 14}}>
                        {format(date, "MMMM dd, yyyy")}
                    </Divider>
                </>);
            }
            return ret;
        }).reverse();

        isGuild && request_users.size >= 1 && websocketState.sendWebsocketMessage?.({
            "op": GatewayOp.GUILD_MEMBERS,
            "d": {
                "guild_id": [channel?.guild_id!],
                "user_ids": [...request_users],
                "presences":false
            }
        })

        return result;
    }

    return (
        <div className="channel-content">
            <div className="channel-messages selectable" onScroll={handleScroll} ref={messagesRef}>
                <div ref={bottomRef}/>
                {messages && getMessages()}
                <div ref={loadingRef} className={`${info?.all && "d-none"}`}>
                    <TextChannelContentSkeleton/>
                </div>

                {info?.all && channel?.type === ChannelType.DM ? <DmChannelBeginning channel={channel!}/> : <GuildChannelBeginning channel={channel!}/>}
            </div>
            <TextChannelInputPanel/>
            <UserProfileMenu/>
        </div>
    );
}
