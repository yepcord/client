import '../../styles/channel-panel.css';
import {Divider} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import DmButton from "./DmButton";
import GroupIcon from "@mui/icons-material/Group";
import DmChannel from "./DmChannel";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import Avatar from "./Avatar";
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import HeadphonesRoundedIcon from '@mui/icons-material/HeadphonesRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import {useNavigate} from "react-router-dom";
import {openSettings} from "../../states/app";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Channel, {ChannelType} from "../../types/channel";
import {useState} from "react";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import TagIcon from '@mui/icons-material/Tag';

function DmChannelList() {
    const state = useSelector((state: RootState) => state.channel.dmChannels);

    return <div className="dm-channel-list">{
        Object.values(state).map(item => {
            return <DmChannel channel={item}/>;
        })
    }</div>;
}

function ProfilePanel() {
    const user = useSelector((state: RootState) => state.app.me);
    const dispatch = useDispatch();

    return (
        <div className="profile-panel">
            <div className="profile-panel-user">
                <Avatar user={user!}/>
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
                <SettingsRoundedIcon onClick={() => dispatch(openSettings())}/>
            </div>
        </div>
    );
}

function DmChannelPanel() {
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

interface ChannelsH {
    [key: string]: {
        channel: Channel,
        channels: Channel[],
    }
}

type ChannelsHValues = {
    channel: Channel,
    channels: Channel[],
};

function CategoryChannel(props: ChannelsHValues) {
    const [open, setOpen] = useState(true);

    props.channels.sort((a, b) => (a.position ? a.position : 0) - (b.position ? b.position : 0));

    return (
        <div>
            <div className="category-channel" onClick={() => setOpen(!open)}>
                <span>{open ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}{props.channel.name!.toUpperCase()}</span>
                <Tooltip title="Create channel">
                    <AddIcon/>
                </Tooltip>
            </div>
            <div className={`channel-panel-guild-items ${!open && "d-none"}`}>
                {props.channels.map(channel => {
                    return (
                        <div className="channel-panel-item-container">
                            <button className="btn-secondary-transparent margin-tb-10px channel-panel-item">
                                <div className="channel-panel-item-name">
                                    {channel.type === ChannelType.GUILD_VOICE ? <VolumeUpIcon/> : <TagIcon/>}
                                    {channel.name}
                                </div>
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

function GuildChannelList() {
    const guild_channels = useSelector((state: RootState) => state.guild.selectedGuild?.channels);

    const buildChannelsHierarchy = (guild_channels: { [key: string]: Channel }): ChannelsHValues[] => {
        let channels: ChannelsH = {};
        for (let channel of Object.values(guild_channels!) as Channel[]) {
            if (channel.type === ChannelType.GUILD_CATEGORY)
                channels[channel.id] = {channel: channel, channels: []};
        }
        for (let channel of Object.values(guild_channels!) as Channel[]) {
            if (channel.parent_id && channel.parent_id in channels)
                channels[channel.parent_id].channels.push(channel);
            else
                channels[channel.id] = {channel: channel, channels: []};
        }
        let result = Object.values(channels) as ChannelsHValues[];
        result.sort((a, b) => (a.channel.position ? a.channel.position : 0) - (b.channel.position ? b.channel.position : 0));
        return result;
    }

    return (
        <div className="guild-channel-list">
            {buildChannelsHierarchy(guild_channels!).map(item => {
                return <CategoryChannel {...item}/>
            })}
        </div>
    );
}

function GuildChannelPanel() {
    const guild = useSelector((state: RootState) => state.guild.selectedGuild);

    return (
        <div className="channel-panel">
            <div className="channel-guild-title">
                <span>{guild!.name}</span>
                <ArrowDropDownIcon/>
            </div>

            <Divider flexItem sx={{borderBottomWidth: "2px"}}/>

            <GuildChannelList/>

            <ProfilePanel/>
        </div>
    );
}

export default function ChannelPanel() {
    const selectedGuild = useSelector((state: RootState) => state.guild.selectedGuild);

    if (selectedGuild === null)
        return <DmChannelPanel/>;
    else
        return <GuildChannelPanel/>;
}