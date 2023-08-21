import User from "../../types/user";
import {MEDIA_ENDPOINT} from "../../constants";
import {StatusBadge} from "./Badges";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

interface AvatarProps {
    user: User,
    withBadge?: boolean,
    size?: number,
    divClassName?: string,
    imgClassName?: string,
}

export default function Avatar({user, withBadge = true, size = 32, divClassName="", imgClassName=""}: AvatarProps) {
    const presence = useSelector((state: RootState) => state.users.presences[user.id]);
    let status = presence ? presence.status : "offline";

    const getAvatarUrl = (user: User) => {
        return user.avatar ? `${MEDIA_ENDPOINT}/avatars/${user.id}/${user.avatar}.webp?size=32` : "/no-image.png";
    }

    return withBadge
        ? (
            <div className={`dm-channel-icon ${divClassName}`}>
                <StatusBadge status={status}>
                    <img width={size} height={size} className="dm-channel-icon-img" src={getAvatarUrl(user)}
                         alt={`${user.username}#${user.discriminator}`}/>
                </StatusBadge>
            </div>
        )
        : (
            <div className={`dm-channel-icon ${divClassName}`}>
                <img width={size} height={size} className={`dm-channel-icon-img ${imgClassName}`} src={getAvatarUrl(user)}
                     alt={`${user.username}#${user.discriminator}`}/>
            </div>
        );
}