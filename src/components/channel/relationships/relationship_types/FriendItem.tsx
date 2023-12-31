import Avatar from "../../../user/Avatar";
import Tooltip from "@mui/material/Tooltip";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import User from "../../../../types/user";
import {dmChannelByUserId} from "../../../../utils";
import {useNavigate} from "react-router-dom";
import {Menu} from "@mui/material";
import React, {useState} from "react";
import TransparentDangerButton from "../../../ui/TransparentDangerButton";
import ApiClient from "../../../../api/client";

interface FriendItemProps {
    user: User,
    status: string
}

export default function FriendItem({user, status}: FriendItemProps) {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);
    const open = Boolean(anchorEl);
    const closeMenu = () => {
        setAnchorEl(null);
    };

    const openChannel = () => {
        dmChannelByUserId(user.id).then(channel => {
            if (channel === null) return;
            navigate(`/channels/@me/${channel.id}`);
        })
    }

    return (
        <>
            <div className="profile-panel bg-transparent" onClick={openChannel}>
                <div className="profile-panel-user">
                    <Avatar user={user}/>

                    <div className="profile-panel-username">
                        <span className="friend-username" style={{color: "#ffffff"}}>
                            <b>{user.username}</b>
                            <span className="friend-discriminator"
                                  style={{color: "#a1a1a1"}}>#{user.discriminator}</span>
                        </span>
                        <span style={{color: "#a1a1a1"}}>{status}</span>
                    </div>
                </div>
                <div className="profile-panel-buttons">
                    <Tooltip title="Message">
                        <ChatBubbleRoundedIcon onClick={e => {
                            e.stopPropagation();
                            openChannel();
                        }}/>
                    </Tooltip>
                    <Tooltip title="More">
                        <MoreVertIcon onClick={e => {
                            e.stopPropagation();
                            setAnchorEl(e.currentTarget);
                        }}/>
                    </Tooltip>
                </div>
            </div>
            <Menu open={open} onClose={closeMenu} anchorEl={anchorEl}
                  slotProps={{paper: {sx: {width: "175px", backgroundColor: "var(--theme-1)", padding: "0 10px"}}}}>
                <TransparentDangerButton className="btn-color-danger w-100" onClick={() => {
                    ApiClient.deleteRelationship(user.id).then();
                    closeMenu();
                }}>
                    Remove Friend
                </TransparentDangerButton>
            </Menu>
        </>
    );
}