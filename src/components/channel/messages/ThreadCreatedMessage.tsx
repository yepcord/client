import {Message} from "../../../types/message";
import {useDispatch} from "react-redux";
import {format, parseISO} from "date-fns";
import {createSnowflake} from "../../../utils";
import {setProfileMenuElement} from "../../../states/messages";
import React, {useContext} from "react";
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import useAuthor from "../../../hooks/use_author";
import {MessageContext} from "./index";

interface ThreadCreatedMessageProps {
    message: Message,
}

export default function ThreadCreatedMessage({message}: ThreadCreatedMessageProps) {
    const date = parseISO(message.timestamp);
    const date_str = format(date, "dd.MM.yyyy h:mm aa");
    const dispatch = useDispatch();
    const profileMenuId = createSnowflake();
    const author = useAuthor(message);
    const ctx = useContext(MessageContext);

    const openProfileMenu = () => dispatch(setProfileMenuElement(profileMenuId));

    return (
        <div className={`message ${ctx.forceHover ? "message-hovered" : ""}`}>
            <div className={`message-container message-bigger-margin`}>
                <div className="message-icon-left">
                    <ForumOutlinedIcon style={{color: "var(--theme-text-secondary)"}}/>
                </div>
                <div className="message-info-content">
                    <div className="message-info">
                        <span className="message-username cursor-pointer" onClick={openProfileMenu}
                              data-profile-menu={profileMenuId}
                              data-profile-message={`${message.channel_id}-${message.id}`}>
                            {author.username}
                        </span>
                        <span className="text-secondary text-14">started a thread!</span>
                        <span className="message-timestamp">{date_str}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}