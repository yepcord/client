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

interface MessageWrapperProps {
    message: React.JSX.Element,
}

export default function MessageWrapper({message}: MessageWrapperProps) {
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

    return (<>
        <div onMouseEnter={e => setAnchorEl(e.currentTarget)} onMouseLeave={close}>
            {message}
        </div>
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="top-end"
                modifiers={[{name: "offset", options: {offset: [-15, -20]}}]}>
            {shiftPressed
                ? (
                    <div className="message-menu" onMouseEnter={() => hovering = true} onMouseLeave={close}>
                        <ReplyIcon className="message-menu-button"/>
                        <EditIcon className="message-menu-button"/>
                        <MarkChatReadIcon className="message-menu-button"/>
                        <PushPinIcon className="message-menu-button"/>
                        <LinkIcon className="message-menu-button"/>
                        <DeleteForeverIcon className="message-menu-button"/>
                    </div>
                )
                : (
                    <div className="message-menu" onMouseEnter={() => hovering = true} onMouseLeave={close}>
                        <AddReactionIcon className="message-menu-button"/>
                        <ReplyIcon className="message-menu-button"/>
                        <MoreHorizIcon className="message-menu-button"/>
                    </div>
                )}
        </Popper>
    </>);
}