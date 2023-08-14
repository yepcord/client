import '../../styles/channel-panel.css';
import {Divider} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import DmButton from "./DmButton";
import GroupIcon from "@mui/icons-material/Group";
import DmChannel from "./DmChannel";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {useEffect} from "react";
import {addChannels} from "../../states/channels";
import Avatar from "./Avatar";
import {setCurrentUser} from "../../states/app";
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import HeadphonesRoundedIcon from '@mui/icons-material/HeadphonesRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import {useNavigate} from "react-router-dom";

interface ChannelPanelProps {
    guild: string,
    channel: string | null,
}

function DmChannelList() {
    const state = useSelector((state: RootState) => state.channel.dmChannels);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://127.0.0.1:8989/channels")
            .then(resp => resp.json())
            .then(json => {
                dispatch(addChannels(json));
            })
    }, [dispatch]);

    return <div className="dm-channel-list">{
        Object.values(state).map(item => {
            return <DmChannel channel={item}/>;
        })
    }</div>;
}

function ProfilePanel() {
    const user = useSelector((state: RootState) => state.app.me);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch("http://127.0.0.1:8989/me")
            .then(resp => resp.json())
            .then(json => {
                dispatch(setCurrentUser(json));
            })
    }, [dispatch]);

    return (
        <div className="profile-panel">
            <div className="profile-panel-user">
                <Avatar user={user!} status="online"/>
                <Tooltip title="Click to copy username">
                    <div className="profile-panel-username"
                         onClick={() => navigator.clipboard.writeText(`${user!.username}#${user!.discriminator}`)}>
                        <span style={{color: "#ffffff"}}><b>{user!.username}</b></span>
                        <span style={{color: "#a1a1a1"}}>#{user!.discriminator}</span>
                    </div>
                </Tooltip>
            </div>
            <div className="profile-panel-buttons">
                <MicRoundedIcon/>
                <HeadphonesRoundedIcon/>
                <SettingsRoundedIcon/>
            </div>
        </div>
    );
}

function DmChannelPanel({guild, channel}: ChannelPanelProps) {
    const navigate = useNavigate();

    return (
        <div className="channel-panel">
            <div className="find-or-start-conversation-container">
                <div className="find-or-start-conversation">
                    Find or start conversation
                </div>
            </div>

            <Divider flexItem sx={{borderBottomWidth: "2px"}}/>

            <DmButton icon={<GroupIcon/>} text="Friends" onClick={() => navigate("/channels/@me")}/>

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

function GuildChannelPanel({guild, channel}: ChannelPanelProps) {
    return (
        <div className="channel-panel">
            Guild channel panel

            <ProfilePanel/>
        </div>
    );
}

export default function ChannelPanel({guild, channel}: ChannelPanelProps) {
    const navigate = useNavigate();

    if(guild === "@me")
        return <DmChannelPanel guild={guild} channel={channel}/>;
    else
        return <GuildChannelPanel guild={guild} channel={channel}/>;
}