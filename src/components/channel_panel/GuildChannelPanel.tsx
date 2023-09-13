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
import CreateGuildChannelDialog from "../dialogs/channels/CreateGuildChannelDialog";
import CreateGuildCategoryDialog from "../dialogs/channels/CreateGuildCategoryDialog";
import {TPrimaryButtonIcon} from "../ui/TPrimaryButtonIcon";

export default function GuildChannelPanel() {
    const guild = useSelector((state: RootState) => state.guild.selectedGuild);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [hideMutedChannels, setHideMuted] = useState(false);
    const [createChannelOpen, setCreateChannelOpen] = useState(false);
    const [createCategoryOpen, setCreateCategoryOpen] = useState(false);
    const open = Boolean(anchorEl);
    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const closeMenu = () => {
        setAnchorEl(null);
    };

    const handleCreateChannel = () => {
        setCreateChannelOpen(true);
        closeMenu();
    }
    const handleCategoryChannel = () => {
        setCreateCategoryOpen(true);
        closeMenu();
    }

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
            <Menu open={open} onClose={closeMenu} anchorEl={anchorEl}
                  anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                  transformOrigin={{vertical: 'top', horizontal: 'center'}}
                  slotProps={{paper: {sx: {width: "225px", backgroundColor: "var(--theme-1)", padding: "0 10px"}}}}>
                <TPrimaryButtonIcon className="btn-color-primary" onClick={closeMenu}>
                    Invite People <GroupAddIcon/>
                </TPrimaryButtonIcon>
                <TPrimaryButtonIcon onClick={closeMenu}>
                    Guild Settings <SettingsIcon/>
                </TPrimaryButtonIcon>
                <TPrimaryButtonIcon onClick={handleCreateChannel}>
                    Create Channel <AddCircleIcon/>
                </TPrimaryButtonIcon>
                <TPrimaryButtonIcon onClick={handleCategoryChannel}>
                    Create Category <CreateNewFolderIcon/>
                </TPrimaryButtonIcon>
                <TPrimaryButtonIcon onClick={closeMenu}>
                    Create Event <EditCalendarIcon/>
                </TPrimaryButtonIcon>
                <TPrimaryButtonIcon onClick={closeMenu}>
                    Active Threads <ChatBubbleIcon/>
                </TPrimaryButtonIcon>

                <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#565656"}}/>

                <TPrimaryButtonIcon onClick={closeMenu}>
                    Notification Settings <NotificationsIcon/>
                </TPrimaryButtonIcon>
                <TPrimaryButtonIcon onClick={closeMenu}>
                    Private Settings <ShieldIcon/>
                </TPrimaryButtonIcon>

                <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#565656"}}/>

                <TPrimaryButtonIcon onClick={closeMenu}>
                    Edit Guild Profile <EditIcon/>
                </TPrimaryButtonIcon>
                <TPrimaryButtonIcon onClick={() => setHideMuted(!hideMutedChannels)}>
                    Hide Muted Channels <Checkbox checked={hideMutedChannels}
                                                  sx={{color: "#fff", padding: "0", '&.Mui-checked': {color: "#fff"}}}/>
                </TPrimaryButtonIcon>
            </Menu>
            <CreateGuildChannelDialog guild_id={guild!.id} parent={null} open={createChannelOpen}
                                      close={() => setCreateChannelOpen(false)}/>
            <CreateGuildCategoryDialog guild_id={guild!.id} open={createCategoryOpen}
                                       close={() => setCreateCategoryOpen(false)}/>
        </>
    );
}