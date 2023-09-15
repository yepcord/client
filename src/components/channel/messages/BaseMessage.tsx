import "../../../styles/messages.css";
import {Message} from "../../../types/message";
import Avatar from "../../user/Avatar";
import {format, parseISO} from "date-fns";
import parse from "./formatting/BasicFormatting";
import React, {useContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createSnowflake} from "../../../utils";
import {setMessageEditing, setProfileMenuElement} from "../../../states/messages";
import {RootState} from "../../../store";
import useAuthor from "../../../hooks/use_author";
import {MessageContext} from "./index";
import {TextChannelInputTextarea} from "../TextChannelInputPanel";
import ApiClient from "../../../api/client";

interface BaseMessageProps {
    message: Message,
}

export default function BaseMessage({message}: BaseMessageProps) {
    const me = useSelector((state: RootState) => state.app.me);
    const author = useAuthor(message);
    const date = parseISO(message.timestamp);
    const date_str = format(date, "dd.MM.yyyy h:mm aa");
    const sent = message.sent === undefined ? false : message.sent;
    const dispatch = useDispatch();
    const profileMenuId = createSnowflake();
    const ctx = useContext(MessageContext);
    const currentlyEditing = useSelector((state: RootState) => state.messages.editing);

    const openProfileMenu = () => dispatch(setProfileMenuElement(profileMenuId));

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
            <div className={`message-container message-bigger-margin ${isMention ? "message-container-mention" : ""}`}>
                <Avatar user={author} withBadge={false} size={36} onClick={openProfileMenu}/>
                <div className="message-info-content">
                    <div className="message-info">
                        <span className="message-username cursor-pointer" onClick={openProfileMenu}
                              data-profile-menu={profileMenuId}
                              data-profile-message={`${message.channel_id}-${message.id}`}>
                            {author.username}
                        </span>
                        <span className="message-timestamp">{date_str}</span>
                    </div>
                    <div className={`message-content selectable ${sent ? "message-content-pending" : ""}`}>
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