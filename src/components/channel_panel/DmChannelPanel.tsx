import {useNavigate} from "react-router-dom";
import {Divider} from "@mui/material";
import DmChannelPanelButton from "./DmChannelPanelButton";
import GroupIcon from "@mui/icons-material/Group";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import DmChannelList from "./DmChannelList";
import ProfilePanel from "./ProfilePanel";

export default function DmChannelPanel() {
    const navigate = useNavigate();

    return (
        <div className="channel-panel">
            <div className="find-or-start-conversation-container">
                <div className="find-or-start-conversation">
                    Find or start conversation
                </div>
            </div>

            <Divider flexItem sx={{borderBottomWidth: "2px"}}/>

            <DmChannelPanelButton icon={<GroupIcon/>} text="Friends" onClick={() => navigate("/channel/@me")}/>

            <div className="dm-divider">
                <div className="dm-divider-text">DIRECT MESSAGES</div>
                <Tooltip title="Create DM" placement="top" arrow>
                    <div className="dm-divider-icon"><AddIcon/></div>
                </Tooltip>
            </div>

            <DmChannelList/>

            <ProfilePanel/>
        </div>
    );
}