import Channel from "../../types/channel";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

interface VoiceChannelProps {
    channel: Channel,
}

export default function VoiceChannel({channel}: VoiceChannelProps) {
    return (
        <div className="channel-panel-item-container">
            <button className="btn-secondary-transparent margin-tb-10px channel-panel-item">
                <div className="channel-panel-item-name">
                    <VolumeUpIcon/>
                    {channel.name}
                </div>
            </button>
        </div>
    );
}