import "../../../styles/messages.css";
import {Message} from "../../../types/message";
import Avatar from "../../user/Avatar";
import {format, parseISO} from "date-fns";
import {parse} from "./formatting";
import React from "react";
import {useDispatch} from "react-redux";
import {createSnowflake} from "../../../utils";
import {setProfileMenuElement} from "../../../states/messages";

interface BaseMessageProps {
    message: Message,
}

export default function BaseMessage({message}: BaseMessageProps) {
    const date = parseISO(message.timestamp);
    const date_str = format(date, "dd.MM.yyyy h:mm aa");
    const sent = message.sent === undefined ? false : message.sent;
    const dispatch = useDispatch();
    const profileMenuId = createSnowflake();

    const openProfileMenu = () => dispatch(setProfileMenuElement(profileMenuId));

    return (
        <div className="message">
            <div className="message-container message-bigger-margin">
                <Avatar user={message.author} withBadge={false} size={36} onClick={openProfileMenu}/>
                <div className="message-info-content">
                    <div className="message-info">
                        <span className="message-username cursor-pointer" onClick={openProfileMenu}
                              data-profile-menu={profileMenuId}
                              data-profile-message={`${message.channel_id}-${message.id}`}>
                            {message.author.username}
                        </span>
                        <span className="message-timestamp">{date_str}</span>
                    </div>
                    <div className={`message-content ${sent ? "message-content-pending" : ""}`}>
                        {parse(message.content ? message.content : "")}
                    </div>
                </div>
            </div>
        </div>
    );
}