import '../../styles/channel-container.css';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import Tooltip from "@mui/material/Tooltip";
import FriendsTitleBar from "./FriendsTitleBar";
import DmTitleBar from "./DmTitleBar";
import GuildTitleBar from "./GuildTitleBar";

export default function ChannelTitleBar() {
    const selectedGuild = useSelector((state: RootState) => state.guild.selectedGuild);
    const selectedChannel = useSelector((state: RootState) => state.channel.selectedChannel);

    let element;
    if (selectedGuild === null && selectedChannel === null) {
        element = <FriendsTitleBar/>;
    } else if (selectedGuild === null && selectedChannel !== null) {
        element = <DmTitleBar/>;
    } else {
        element = <GuildTitleBar/>;
    }

    return (
        <div className="channel-titlebar">
            {element}

            <Tooltip title="Help" placement="bottom" arrow>
                <HelpOutlineRoundedIcon className="titlebar-icon-button"/>
            </Tooltip>
        </div>
    )
}