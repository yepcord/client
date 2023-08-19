import GroupIcon from "@mui/icons-material/Group";
import {setFriendsTab} from "../../states/app";
import Tooltip from "@mui/material/Tooltip";
import AddCommentRoundedIcon from "@mui/icons-material/AddCommentRounded";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";

export default function FriendsTitleBar() {
    const dispatch = useDispatch();
    const selectedTab = useSelector((state: RootState) => state.app.selectedFriendsTab);

    return (<>
        <div className="channel-titlebar-info">
            <GroupIcon/>
            <div className="channel-titlebar-title">Friends</div>
        </div>
        <div className="vertical-divider"/>
        <div className="friends-buttons-container">
            <div className="friends-buttons">
                <button
                    className={`titlebar-friends-button ${selectedTab === "online" ? "titlebar-friends-button-selected" : ""}`}
                    onClick={() => dispatch(setFriendsTab("online"))}>
                    Online
                </button>
                <button
                    className={`titlebar-friends-button ${selectedTab === "all" ? "titlebar-friends-button-selected" : ""}`}
                    onClick={() => dispatch(setFriendsTab("all"))}>
                    All
                </button>
                <button
                    className={`titlebar-friends-button ${selectedTab === "pending" ? "titlebar-friends-button-selected" : ""}`}
                    onClick={() => dispatch(setFriendsTab("pending"))}>
                    Pending
                </button>
                <button
                    className={`titlebar-friends-button ${selectedTab === "blocked" ? "titlebar-friends-button-selected" : ""}`}
                    onClick={() => dispatch(setFriendsTab("blocked"))}>
                    Blocked
                </button>

                <button
                    className={`titlebar-friends-button-green ${selectedTab === "add" ? "titlebar-friends-button-green-selected" : ""}`}
                    onClick={() => dispatch(setFriendsTab("add"))}>
                    Add Friend
                </button>
            </div>
            <Tooltip title="New Group DM" placement="bottom" arrow>
                <AddCommentRoundedIcon className="titlebar-icon-button"/>
            </Tooltip>
        </div>

        <div className="vertical-divider"/>
    </>);
}