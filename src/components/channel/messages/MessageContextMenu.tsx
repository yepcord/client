import React from "react";
import {Menu} from "@mui/material";
import {TPrimaryButtonIcon} from "../../ui/TPrimaryButtonIcon";
import EditIcon from "@mui/icons-material/Edit";
import PushPinIcon from "@mui/icons-material/PushPin";
import ReplyIcon from "@mui/icons-material/Reply";
import LinkIcon from "@mui/icons-material/Link";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {Message} from "../../../types/message";
import {checkPermissions} from "../../../utils";
import {Permissions} from "../../../types/guild";
import ApiClient from "../../../api/client";

interface MessageContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    message: Message,
}

export default function MessageContextMenu({message, ...props}: MessageContextMenuProps) {
    const me = useSelector((state: RootState) => state.app.me);
    const [contextMenu, setContextMenu] = React.useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);

    const openContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu(contextMenu === null ? {mouseX: event.clientX + 2, mouseY: event.clientY - 6} : null);
    };

    const closeMenu = () => {
        setContextMenu(null);
    };

    const deleteMessage = () => {
        ApiClient.deleteMessage(message.channel_id, message.id);
        closeMenu();
    }

    const canDelete = message.author.id === me!.id && checkPermissions(message.channel_id, Permissions.MANAGE_MESSAGES);
    const canEdit = message.author.id === me!.id && checkPermissions(message.channel_id, Permissions.MANAGE_MESSAGES);
    const canPin = checkPermissions(message.channel_id, Permissions.MANAGE_CHANNELS);
    const canReply = checkPermissions(message.channel_id, Permissions.SEND_MESSAGES);

    return (<>
        <div {...props} onContextMenu={openContextMenu}/>

        <Menu
            open={contextMenu !== null}
            onClose={closeMenu}
            anchorReference="anchorPosition"
            anchorPosition={
                contextMenu !== null
                    ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                    : undefined
            }
            slotProps={{paper: {sx: {width: "175px", backgroundColor: "var(--theme-1)", padding: "0 10px"}}}}>

            {canEdit && <TPrimaryButtonIcon onClick={closeMenu}>
                Edit Message <EditIcon/>
            </TPrimaryButtonIcon>}
            {canPin && <TPrimaryButtonIcon onClick={closeMenu}>
                Pin Message <PushPinIcon/>
            </TPrimaryButtonIcon>}
            {canReply && <TPrimaryButtonIcon onClick={closeMenu}>
                Reply <ReplyIcon/>
            </TPrimaryButtonIcon>}
            <TPrimaryButtonIcon onClick={closeMenu}>
                Mark Unread <MarkChatReadIcon/>
            </TPrimaryButtonIcon>
            <TPrimaryButtonIcon onClick={closeMenu}>
                Copy Link <LinkIcon/>
            </TPrimaryButtonIcon>
            {canDelete && <TPrimaryButtonIcon onClick={deleteMessage}>
                Delete Message <DeleteForeverIcon/>
            </TPrimaryButtonIcon>}
        </Menu>
    </>);
}