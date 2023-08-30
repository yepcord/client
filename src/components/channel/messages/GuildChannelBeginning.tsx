import Channel from "../../../types/channel";
import TagRoundedIcon from "@mui/icons-material/TagRounded";

interface GuildChannelBeginningProps {
    channel: Channel,
}

export default function GuildChannelBeginning({channel}: GuildChannelBeginningProps) {
    return (
        <div className="channel-beginning-container">
            <TagRoundedIcon className="channel-beginning-icon"/>
            <h1>Welcome to {channel.name}</h1>
            <span className="channel-beginning-text">This is the start of the #{channel.name} channel.</span>
        </div>
    );
}