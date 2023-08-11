import '../styles/channel-panel.css';
import {Divider} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import DmButton from "./DmButton";
import GroupIcon from "@mui/icons-material/Group";
import DmChannel from "./DmChannel";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {useEffect} from "react";
import {addChannels} from "../reducers/channelSlice";

function DmChannelList() {
    const state = useSelector((state: RootState) => state.channel.dmChannels);
    const dispatch = useDispatch();

    /*useEffect(() => {
        fetch("http://127.0.0.1:8989/channels")
            .then(resp => resp.json())
            .then(json => {
                dispatch(addChannels(json));
            })
    }, []);*/

    return <>{
        Object.values(state).map(item => {
            return <DmChannel channel={item}/>;
        })
    }</>;
}

export default function ChannelPanel() {
    return (
        <div className="channel-panel">
            <div className="find-or-start-conversation-container">
                <div className="find-or-start-conversation">
                    Find or start conversation
                </div>
            </div>

            <Divider flexItem sx={{borderBottomWidth: "2px"}}/>

            <DmButton icon={<GroupIcon/>} text="Friends"/>

            <div className="dm-divider">
                <div className="dm-divider-text">DIRECT MESSAGES</div>
                <Tooltip title="Create DM" placement="top" arrow>
                    <div className="dm-divider-icon"><AddIcon/></div>
                </Tooltip>
            </div>

            <DmChannelList/>
        </div>
    );
}