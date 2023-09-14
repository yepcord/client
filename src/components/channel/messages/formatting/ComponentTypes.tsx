import {MEDIA_ENDPOINT} from "../../../../constants";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {createSnowflake} from "../../../../utils";
import {setProfileMenuElement} from "../../../../states/messages";
import {format, formatRelative} from "date-fns";
import Tooltip from "@mui/material/Tooltip";

interface EmojiProps {
    emoji_name: string,
    emoji_id: string,
}

export function Emoji({emoji_name, emoji_id}: EmojiProps) {
    return (
        <span className="cursor-pointer" aria-label={`:${emoji_name}:`}>
            <img alt={`:${emoji_name}:`} width={20} height={20}
                 src={`${MEDIA_ENDPOINT}/emojis/${emoji_id}.webp?size=44&quality=lossless`}/>
        </span>
    );
}

interface LinkProps {
    url: string,
}

export function Link({url}: LinkProps) {
    return <a href={url} target="_blank" className="message-component-link" rel="noreferrer">{url}</a>;
}

interface MentionProps {
    user_id: string,
}

export function Mention({user_id}: MentionProps) {
    const user = useSelector((state: RootState) => state.users.users[user_id]);
    const dispatch = useDispatch();

    return (
        <span data-profile-menu={createSnowflake()} data-profile-user={user.id} data-profile-mention="true"
              className="btn-primary btn-ping cursor-pointer"
              onClick={e => dispatch(setProfileMenuElement(e.currentTarget.getAttribute("data-profile-menu")))}>
            @{user ? user.username : "Unknown User"}
        </span>
    );
}

interface MentionEveryoneProps {
    mention: "everyone" | "here",
}

export function MentionEveryone({mention}: MentionEveryoneProps) {
    return <span className="btn-primary btn-ping">@{mention}</span>;
}

interface TimeProps {
    timestamp: number,
    type: string,
}

export function Time({timestamp, type}: TimeProps) {
    const date = new Date(timestamp * 1000);
    let form;
    if (type === "t") form = "h:mm aa";
    else if (type === "T") form = "h:mm:ss aa";
    else if (type === "d") form = "dd/MM/yyyy";
    else if (type === "D") form = "MMMM dd, yyyy";
    else if (type === "F") form = "eeee, MMMM dd, yyyy h:mm aa";
    else form = "MMMM dd, yyyy h:mm aa";

    return (
        <Tooltip title={format(date, "eeee, MMMM dd, yyyy h:mm aa")}>
            <span className="message-time">
                {format(date, form)}
            </span>
        </Tooltip>
    );
}