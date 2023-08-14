import '../../styles/channel-container.css';
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import GroupIcon from "@mui/icons-material/Group";
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {setFriendsTab} from "../../states/app";
import Tooltip from "@mui/material/Tooltip";

interface TitleBarProps {
    guild: string,
    channel: string | null,
}

export default function ChannelTitleBar({guild, channel}: TitleBarProps) {
    const selectedTab = useSelector((state: RootState) => state.app.selectedFriendsTab);
    const dispatch = useDispatch();

    if (guild === "@me" && channel === null) {
        return (
            <div className="channel-titlebar">
                <GroupIcon/>
                <p><b>Friends</b></p>
                <div className="vertical-divider"/>
                <div className="friends-buttons-container">
                    <div className="friends-buttons">
                        <button
                            className={`titlebar-friends-button ${selectedTab === "online" ? "titlebar-friends-button-selected" : ""}`}
                            onClick={() => dispatch(setFriendsTab("online"))}>Online
                        </button>
                        <button
                            className={`titlebar-friends-button ${selectedTab === "all" ? "titlebar-friends-button-selected" : ""}`}
                            onClick={() => dispatch(setFriendsTab("all"))}>All
                        </button>
                        <button
                            className={`titlebar-friends-button ${selectedTab === "pending" ? "titlebar-friends-button-selected" : ""}`}
                            onClick={() => dispatch(setFriendsTab("pending"))}>Pending
                        </button>
                        <button
                            className={`titlebar-friends-button ${selectedTab === "blocked" ? "titlebar-friends-button-selected" : ""}`}
                            onClick={() => dispatch(setFriendsTab("blocked"))}>Blocked
                        </button>

                        <button
                            className={`titlebar-friends-button-green ${selectedTab === "add" ? "titlebar-friends-button-green-selected" : ""}`}
                            onClick={() => dispatch(setFriendsTab("add"))}>Add Friend
                        </button>
                    </div>
                    <Tooltip title="New Group DM" placement="bottom" arrow>
                        <AddCommentRoundedIcon className="titlebar-icon-button"/>
                    </Tooltip>
                </div>

                <div className="vertical-divider"/>
                <Tooltip title="Help" placement="bottom" arrow>
                    <HelpOutlineRoundedIcon className="titlebar-icon-button"/>
                </Tooltip>
            </div>
        )
    } else if (guild === "@me" && channel !== null) {
        return (
            <div className="channel-titlebar">
                <TagRoundedIcon/>
                <p><b>DM channel title bar</b></p>
            </div>
        );
    } else {
        return (
            <div className="channel-titlebar">
                <TagRoundedIcon/>
                <p><b>Guild channel title bar</b></p>
            </div>
        );
    }
}