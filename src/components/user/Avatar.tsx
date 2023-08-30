import User from "../../types/user";
import {MEDIA_ENDPOINT} from "../../constants";
import {StatusBadge} from "./Badges";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import React from "react";

export interface AvatarProps {
    user: User,
    withBadge?: boolean,
    size?: number,
    divClassName?: string,
    imgClassName?: string,
    onClick?: ((arg0: React.MouseEvent<HTMLDivElement>) => void) | undefined,
    ref?: React.RefObject<HTMLDivElement> | undefined,
}

export default function Avatar({user, withBadge = true, size = 32, divClassName="", imgClassName="", onClick=undefined}: AvatarProps) {
    const presence = useSelector((state: RootState) => state.users.presences[user.id]);
    let status = presence ? presence.status : "offline";

    const getAvatarUrl = (user: User) => {
        return user.avatar ? `${MEDIA_ENDPOINT}/avatars/${user.id}/${user.avatar}.webp?size=${size}` : "/no-image.png";
    }

    return withBadge
        ? (
            <div className={`dm-channel-icon ${divClassName} ${onClick ? "cursor-pointer" : ""}`} onClick={onClick}>
                <StatusBadge status={status}>
                    <img width={size} height={size} className="dm-channel-icon-img" src={getAvatarUrl(user)}
                         alt={`${user.username}#${user.discriminator}`}/>
                </StatusBadge>
            </div>
        )
        : (
            <div className={`dm-channel-icon ${divClassName} ${onClick ? "cursor-pointer" : ""}`} onClick={onClick}>
                <img width={size} height={size} className={`dm-channel-icon-img ${imgClassName}`} src={getAvatarUrl(user)}
                     alt={`${user.username}#${user.discriminator}`}/>
            </div>
        );
}