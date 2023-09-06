import {Message} from "../../../types/message";
import {useDispatch} from "react-redux";
import {format, parseISO} from "date-fns";
import {createSnowflake} from "../../../utils";
import {setProfileMenuElement} from "../../../states/messages";
import React from "react";
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

interface ThreadCreatedMessageProps {
    message: Message,
}

export default function ThreadCreatedMessage({message}: ThreadCreatedMessageProps) {
    const date = parseISO(message.timestamp);
    const date_str = format(date, "dd.MM.yyyy h:mm aa");
    const dispatch = useDispatch();
    const profileMenuId = createSnowflake();

    const openProfileMenu = () => dispatch(setProfileMenuElement(profileMenuId));

    return (
        <div className="message">
            <div className={`message-container message-bigger-margin`}>
                <ForumOutlinedIcon style={{color: "var(--theme-text-secondary)"}}/>
                <div className="message-info-content">
                    <div className="message-info">
                        <span className="message-username cursor-pointer" onClick={openProfileMenu}
                              data-profile-menu={profileMenuId}
                              data-profile-message={`${message.channel_id}-${message.id}`}>
                            {message.author.username}
                        </span>
                        <span className="text-secondary text-14">started a thread!</span>
                        <span className="message-timestamp">{date_str}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}