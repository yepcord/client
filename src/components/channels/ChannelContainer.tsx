import '../../styles/channel-container.css';
import ChannelTitleBar from "./ChannelTitleBar";
import ChannelContent from "./ChannelContent";
import {Divider} from "@mui/material";

interface ChannelContainerProps {
    guild: string,
    channel: string | null,
}

export default function ChannelContainer({guild, channel}: ChannelContainerProps) {
    return (
        <div className="channel-container">
            <ChannelTitleBar guild={guild} channel={channel}/>
            <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b"}}/>
            <ChannelContent guild={guild} channel={channel}/>
        </div>
    );
}