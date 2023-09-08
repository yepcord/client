import "../../../styles/messages.css";
import {Message} from "../../../types/message";
import Avatar from "../../user/Avatar";
import {format, parseISO} from "date-fns";
import {parse} from "./formatting";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {createSnowflake} from "../../../utils";
import {setProfileMenuElement} from "../../../states/messages";
import {RootState} from "../../../store";
import useAuthor from "../../../hooks/use_author";

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

    const openProfileMenu = () => dispatch(setProfileMenuElement(profileMenuId));

    const isMention = message.mention_everyone || message.mentions?.map(item => {
        return item.id === me?.id;
    }).includes(true);

    return (
        <div className="message">
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
                        {parse(message.content ? message.content : "")}
                    </div>
                </div>
            </div>
        </div>
    );
}