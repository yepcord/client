import '../../styles/channel-container.css';
import ChannelTitleBar from "../channel_titlebar/ChannelTitleBar";
import ChannelContent from "./ChannelContent";
import {Divider} from "@mui/material";

export default function ChannelContainer() {
    return (
        <div className="channel-container">
            <ChannelTitleBar/>
            <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b"}}/>
            <ChannelContent/>
        </div>
    );
}