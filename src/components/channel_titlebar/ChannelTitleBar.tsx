import '../../styles/channel-container.css';
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import GroupIcon from "@mui/icons-material/Group";
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {setFriendsTab} from "../../states/app";
import Tooltip from "@mui/material/Tooltip";
import {StatusIcon} from "../channels/Badges";
import {ChannelType} from "../../types/channel";
import FriendsTitleBar from "./FriendsTitleBar";
import DmTitleBar from "./DmTitleBar";
import GuildTitleBar from "./GuildTitleBar";

export default function ChannelTitleBar() {
    const selectedGuild = useSelector((state: RootState) => state.guild.selectedGuild);
    const selectedChannel = useSelector((state: RootState) => state.channel.selectedChannel);
    const recipient = selectedChannel?.type === ChannelType.DM ? selectedChannel?.recipients![0] : null;
    const presence = useSelector((state: RootState) => state.users.presences[recipient?.id!]);

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