import {useSelector} from "react-redux";
import {RootState} from "../../store";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {Checkbox, Divider, Menu} from "@mui/material";
import GuildChannelList from "./GuildChannelList";
import ProfilePanel from "./ProfilePanel";
import React, {useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import EditIcon from '@mui/icons-material/Edit';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShieldIcon from '@mui/icons-material/Shield';

interface GuildMenuButtonProps {
    children?: React.ReactNode,
    onClick?: () => void,
    className?: string,
}

function GuildMenuButton({children, onClick, className}: GuildMenuButtonProps) {
    return <button className={`btn-primary-wide bg-transparent space-between align-center ${className}`} style={{fontSize: "14px"}} onClick={onClick}>
        {children}
    </button>;
}

export default function GuildChannelPanel() {
    const guild = useSelector((state: RootState) => state.guild.selectedGuild);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [hideMutedChannels, setHideMuted] = useState(false);
    const open = Boolean(anchorEl);
    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const closeMenu = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div className="channel-panel">
                <div className="channel-guild-title" onClick={openMenu}>
                    <span>{guild!.name}</span>
                    {open ? <CloseIcon/> : <ArrowDropDownIcon/>}
                </div>

                <Divider flexItem sx={{borderBottomWidth: "2px"}}/>

                <GuildChannelList/>

                <ProfilePanel/>
            </div>
            <Menu open={open} onClose={closeMenu} anchorEl={anchorEl} anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                  slotProps={{paper: {sx: {width: "225px", backgroundColor: "#2a2a2a", padding: "0 10px"}}}}>
                <GuildMenuButton className="btn-color-primary" onClick={closeMenu}>
                    Invite People <GroupAddIcon/>
                </GuildMenuButton>
                <GuildMenuButton onClick={closeMenu}>
                    Guild Settings <SettingsIcon/>
                </GuildMenuButton>
                <GuildMenuButton onClick={closeMenu}>
                    Create Channel <AddCircleIcon/>
                </GuildMenuButton>
                <GuildMenuButton onClick={closeMenu}>
                    Create Category <CreateNewFolderIcon/>
                </GuildMenuButton>
                <GuildMenuButton onClick={closeMenu}>
                    Create Event <EditCalendarIcon/>
                </GuildMenuButton>
                <GuildMenuButton onClick={closeMenu}>
                    Active Threads <ChatBubbleIcon/>
                </GuildMenuButton>

                <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#565656" }}/>

                <GuildMenuButton onClick={closeMenu}>
                    Notification Settings <NotificationsIcon/>
                </GuildMenuButton>
                <GuildMenuButton onClick={closeMenu}>
                    Private Settings <ShieldIcon/>
                </GuildMenuButton>

                <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#565656" }}/>

                <GuildMenuButton onClick={closeMenu}>
                    Edit Guild Profile <EditIcon/>
                </GuildMenuButton>
                <GuildMenuButton onClick={() => setHideMuted(!hideMutedChannels)}>
                    Hide Muted Channels <Checkbox checked={hideMutedChannels} sx={{ color: "#fff", padding: "0", '&.Mui-checked': {color: "#fff"} }} />
                </GuildMenuButton>
            </Menu>
        </>
    );
}