import {MEDIA_ENDPOINT} from "../../constants";

interface RemoteAuthAvatarProps {
    id: string,
    avatar: string | null,
}

export default function RemoteAuthAvatar({id, avatar}: RemoteAuthAvatarProps) {
    const avatarUrl = avatar ? `${MEDIA_ENDPOINT}/avatars/${id}/${avatar}.webp?size=192` : "/no-image.png"

    return <img className="remote-auth-avatar" src={avatarUrl} alt="Avatar"/>;
}