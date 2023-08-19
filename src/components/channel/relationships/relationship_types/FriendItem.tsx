import Avatar from "../../../user/Avatar";
import Tooltip from "@mui/material/Tooltip";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import User from "../../../../types/user";

interface FriendItemProps {
    user: User,
    status: string
}

export default function FriendItem({user, status}: FriendItemProps) {
    return (
        <div className="profile-panel bg-transparent">
            <div className="profile-panel-user">
                <Avatar user={user}/>

                <div className="profile-panel-username">
                        <span className="friend-username" style={{color: "#ffffff"}}>
                            <b>{user.username}</b>
                            <span className="friend-discriminator" style={{color: "#a1a1a1"}}>#{user.discriminator}</span>
                        </span>
                    <span style={{color: "#a1a1a1"}}>{status}</span>
                </div>
            </div>
            <div className="profile-panel-buttons">
                <Tooltip title="Message">
                    <ChatBubbleRoundedIcon/>
                </Tooltip>
                <Tooltip title="More">
                    <MoreVertIcon/>
                </Tooltip>
            </div>
        </div>
    );
}