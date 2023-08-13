import Channel from "../../types/channel";
import {MEDIA_ENDPOINT} from "../../api/constants";

interface IconProps {
    channel: Channel,
}

export default function ChannelIcon({channel}: IconProps) {
    const getChannelIconUrl = (channel: Channel) => {
        return channel.icon ? `${MEDIA_ENDPOINT}/channel-icons/${channel.id}/${channel.icon}.webp?size=32` : "/empty-channel-icon.png";
    }

    return (
        <div className="dm-channel-icon">
            <img src={getChannelIconUrl(channel)} alt={`${channel.name}`}/>
        </div>
    );
}