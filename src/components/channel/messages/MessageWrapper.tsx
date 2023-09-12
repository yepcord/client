import React, {useState} from "react";
import {Popper} from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';
import EditIcon from '@mui/icons-material/Edit';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import PushPinIcon from '@mui/icons-material/PushPin';
import LinkIcon from '@mui/icons-material/Link';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {MessageContext} from "./index";
import {Message} from "../../../types/message";
import {Permissions} from "../../../types/guild";
import {checkPermissions} from "../../../utils";
import Tooltip from "@mui/material/Tooltip";
import SvgIcon from "@mui/material/SvgIcon/SvgIcon";

interface MessageWrapperProps {
    messageElement: React.JSX.Element,
    message: Message,
}

interface MessageBtnProps {
    name: string,
    component: typeof SvgIcon,
}

function Btn({name, component}: MessageBtnProps) {
    const Component = component;
    return (
        <Tooltip title={name} placement="top" arrow>
            <Component className="message-menu-button"/>
        </Tooltip>
    );
}

export default function MessageWrapper({messageElement, message}: MessageWrapperProps) {
    const me = useSelector((state: RootState) => state.app.me);
    const shiftPressed = useSelector((state: RootState) => state.app.pressedKeys.shift);
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    let hovering = false;

    const close = () => {
        hovering = false;
        setTimeout(() => {
            if (!hovering) setAnchorEl(null);
            hovering = false;
        }, 20);
    }

    const canDelete = message.author.id === me!.id && checkPermissions(message.channel_id, Permissions.MANAGE_MESSAGES);
    const canEdit = message.author.id === me!.id && checkPermissions(message.channel_id, Permissions.MANAGE_MESSAGES);
    const canAddReaction = checkPermissions(message.channel_id, Permissions.ADD_REACTIONS);
    const canPin = checkPermissions(message.channel_id, Permissions.MANAGE_CHANNELS);
    const canReply = checkPermissions(message.channel_id, Permissions.SEND_MESSAGES);

    return (<>
        <div onMouseEnter={e => setAnchorEl(e.currentTarget)} onMouseLeave={close}>
            <MessageContext.Provider value={{forceHover: Boolean(anchorEl)}}>
                {messageElement}
            </MessageContext.Provider>
        </div>
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="top-end"
                modifiers={[{name: "offset", options: {offset: [-15, -20]}}]}>
            {shiftPressed
                ? (
                    <div className="message-menu" onMouseEnter={() => hovering = true} onMouseLeave={close}>
                        {canReply && <Btn name="Reply" component={ReplyIcon}/>}
                        {canEdit && <Btn name="Edit" component={EditIcon}/>}
                        <Btn name="Mark Unread" component={MarkChatReadIcon}/>
                        {canPin && <Btn name="Pin Message" component={PushPinIcon}/>}
                        <Btn name="Copy Link" component={LinkIcon}/>
                        {canDelete && <Btn name="Delete" component={DeleteForeverIcon}/>}
                    </div>
                )
                : (
                    <div className="message-menu" onMouseEnter={() => hovering = true} onMouseLeave={close}>
                        {canAddReaction && <Btn name="Add Reaction" component={AddReactionIcon}/>}
                        {canReply && <Btn name="Reply" component={ReplyIcon}/>}
                        <Btn name="More" component={MoreHorizIcon}/>
                    </div>
                )}
        </Popper>
    </>);
}