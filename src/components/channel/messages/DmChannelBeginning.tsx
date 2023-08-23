import Channel from "../../../types/channel";
import Avatar from "../../user/Avatar";

interface DmChannelBeginningProps {
    channel: Channel,
}

export default function DmChannelBeginning({channel}: DmChannelBeginningProps) {
    const user = channel.recipients![0];

    return (
        <div className="channel-beginning-container">
            <Avatar user={user} withBadge={false} size={96}/>
            <h1>{user.username}</h1>
            <span className="channel-beginning-text">This is the beginning of your direct message history with
                <span className="channel-beginning-username-text"> @{user.username}</span>
            </span>
        </div>
    );
}