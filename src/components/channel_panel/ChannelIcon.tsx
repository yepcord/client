import Channel from "../../types/channel";
import {MEDIA_ENDPOINT} from "../../constants";

interface IconProps {
    channel: Channel,
}

export default function ChannelIcon({channel}: IconProps) {
    const getChannelIconUrl = (channel: Channel) => {
        return channel.icon ? `${MEDIA_ENDPOINT}/channel-icons/${channel.id}/${channel.icon}.webp?size=32` : "/no-image.png";
    }

    return (
        <div className="dm-channel-icon">
            <img width={32} height={32} src={getChannelIconUrl(channel)} alt={`${channel.name}`}/>
        </div>
    );
}