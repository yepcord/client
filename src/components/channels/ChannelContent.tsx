import '../../styles/channel-container.css';
import '../../styles/channel-content.css';
import {useState} from "react";
import {Divider} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import Avatar from "./Avatar";
import Tooltip from "@mui/material/Tooltip";
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';


function FriendsList() {
    const user = useSelector((state: RootState) => state.app.me)

    return (
        <div className="friends-list">
            <div className="profile-panel bg-transparent">
                <div className="profile-panel-user">
                    <Avatar user={user!} status="online"/>
                    <div className="profile-panel-username"
                         onClick={() => navigator.clipboard.writeText(`${user!.username}#${user!.discriminator}`)}>
                        <span className="friend-username" style={{color: "#ffffff"}}><b>{user!.username}</b><span
                            className="friend-discriminator"
                            style={{color: "#a1a1a1"}}>#{user!.discriminator}</span></span>
                        <span style={{color: "#a1a1a1"}}>Status</span>
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
        </div>
    );
}

function FriendsContent() {
    const tab = useSelector((state: RootState) => state.app.selectedFriendsTab);
    const [searchText, setSearchText] = useState("");

    let text;
    if (tab === "online")
        text = "ONLINE FRIENDS";
    else if (tab === "all")
        text = "ALL FRIENDS";
    else if (tab === "pending")
        text = "PENDING FRIEND REQUESTS";
    else if (tab === "blocked")
        text = "BLOCKED USERS";

    return (
        <div className="channel-content">
            <div className="friends-list-container">
                <input type="text" className="input-primary w-100" placeholder="Search..."
                       onChange={e => setSearchText(e.target.value)}/>
                <p>{text} - ?</p>
                <Divider flexItem sx={{backgroundColor: "#757575"}}/>
                <FriendsList/>
            </div>

        </div>
    )
}

export default function ChannelContent() {
    const selectedGuild = useSelector((state: RootState) => state.guild.selectedGuild);
    const selectedChannel = useSelector((state: RootState) => state.channel.selectedChannel);

    if (selectedGuild === null && selectedChannel === null) {
        return <FriendsContent/>;
    } else {
        return (
            <div className="channel-content">
                <p><b>Guild or DM channel content</b></p>
            </div>
        );
    }
}