import {Message} from "../../../types/message";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {format, parseISO} from "date-fns";
import {createSnowflake} from "../../../utils";
import {setProfileMenuElement} from "../../../states/messages";
import React, {useContext} from "react";
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import useAuthor from "../../../hooks/use_author";
import {MessageContext} from "./index";

interface UserJoinMessageProps {
    message: Message,
}

export default function UserJoinMessage({message}: UserJoinMessageProps) {
    const me = useSelector((state: RootState) => state.app.me);
    const author = useAuthor(message);
    const date = parseISO(message.timestamp);
    const date_str = format(date, "dd.MM.yyyy h:mm aa");
    const dispatch = useDispatch();
    const profileMenuId = createSnowflake();
    const ctx = useContext(MessageContext);

    const openProfileMenu = () => dispatch(setProfileMenuElement(profileMenuId));

    const isMention = message.mentions?.map(item => {
        return item.id === me?.id;
    }).includes(true);

    return (
        <div className={`message ${ctx.forceHover ? "message-hovered" : ""}`}>
            <div className={`message-container message-bigger-margin ${isMention ? "message-container-mention" : ""}`}>
                <EastOutlinedIcon style={{color: "var(--theme-c-success-h)"}}/>
                <div className="message-info-content">
                    <div className="message-info">
                        <span className="message-username cursor-pointer" onClick={openProfileMenu}
                              data-profile-menu={profileMenuId}
                              data-profile-message={`${message.channel_id}-${message.id}`}>
                            {author.username}
                        </span>
                        <span className="text-secondary text-14">just showed up!</span>
                        <span className="message-timestamp">{date_str}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}