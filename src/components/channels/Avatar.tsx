import User from "../../types/user";
import {MEDIA_ENDPOINT} from "../../api/constants";

interface AvatarProps {
    user: User,
    status: "online" | "offline" | "idle" | "dnd",
}

export default function Avatar({user, status}: AvatarProps) {
    const getAvatarUrl = (user: User) => {
        return user.avatar ? `${MEDIA_ENDPOINT}/avatars/${user.id}/${user.avatar}.webp?size=32` : "/empty-avatar.png";
    }

    return (
        <div className="dm-channel-icon">
            <img src={getAvatarUrl(user)} alt={`${user.username}#${user.discriminator}`}/>
        </div>
    );
}