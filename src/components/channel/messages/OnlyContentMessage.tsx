import "../../../styles/messages.css";
import {Message} from "../../../types/message";
import {format, parseISO} from "date-fns";
import parse from "./formatting/BasicFormatting";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import React, {useContext} from "react";
import {MessageContext} from "./index";
import {setMessageEditing} from "../../../states/messages";
import ApiClient from "../../../api/client";
import {TextChannelInputTextarea} from "../TextChannelInputPanel";

interface OnlyContentMessageProps {
    message: Message,
}

export default function OnlyContentMessage({message}: OnlyContentMessageProps) {
    const me = useSelector((state: RootState) => state.app.me);
    const date = parseISO(message.timestamp);
    const date_str = format(date, "h:mm aa");
    const sent = message.sent === undefined ? false : message.sent;
    const ctx = useContext(MessageContext);
    const currentlyEditing = useSelector((state: RootState) => state.messages.editing);
    const dispatch = useDispatch();

    const isMention = message.mention_everyone || message.mentions?.map(item => {
        return item.id === me?.id;
    }).includes(true);

    const messageKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, text: string) => {
        if(currentlyEditing !== message.id) return;

        if(e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            if(!text) {
                // ApiClient.deleteMessage(message.channel_id, message.id);
                dispatch(setMessageEditing(null));
                return;
            }

            ApiClient.editMessage(message.channel_id, message.id, text).then()
            dispatch(setMessageEditing(null));
        } else if(e.keyCode === 27) {
            dispatch(setMessageEditing(null));
        }
    }

    return (
        <div className={`message ${ctx.forceHover ? "message-hovered" : ""}`}>
            <div className={`message-container ${isMention ? "message-container-mention" : ""}`}>
                <div className="message-timestamp-left">
                    {date_str}
                </div>
                <div className="message-info-content">
                    <div className={`message-content selectable ${sent ? "message-content-pending" : ""}`}
                         contentEditable={currentlyEditing === message.id}>
                        {currentlyEditing === message.id
                            ? <TextChannelInputTextarea className="edit-input" keyDown={messageKeyDown}
                                                        initialText={message.content || ""} placeholder=""/>
                            : parse(message.content ? message.content : "")
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}