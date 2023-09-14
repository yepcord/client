import {MEDIA_ENDPOINT} from "../../../../constants";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {createSnowflake} from "../../../../utils";
import {setProfileMenuElement} from "../../../../states/messages";

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