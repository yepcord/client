import User from "../../types/user";
import {MEDIA_ENDPOINT} from "../../constants";
import {StatusBadge} from "./Badges";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

interface AvatarProps {
    user: User,
}

export default function Avatar({user}: AvatarProps) {
    const presence = useSelector((state: RootState) => state.users.presences[user.id]);
    let status = presence ? presence.status : "offline";

    const getAvatarUrl = (user: User) => {
        return user.avatar ? `${MEDIA_ENDPOINT}/avatars/${user.id}/${user.avatar}.webp?size=32` : "/empty-avatar.png";
    }

    return (
        <div className="dm-channel-icon">
            <StatusBadge status={status}>
                <img className="dm-channel-icon-img" src={getAvatarUrl(user)} alt={`${user.username}#${user.discriminator}`}/>
            </StatusBadge>
        </div>
    );
}