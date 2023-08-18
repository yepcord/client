import '../../styles/badges.css';
import {Badge} from "@mui/material";

interface StatusBadgeProps {
    status: "online" | "offline" | "idle" | "dnd",
    children: React.ReactNode
}

interface StatusIconProps {
    status: "online" | "offline" | "idle" | "dnd",
}

export function StatusIcon({status}: StatusIconProps) {
    if(status === "online")
        return <div className="badge online-badge"/>;
    if(status === "idle")
        return <div className="badge idle-badge"/>;
    if(status === "dnd")
        return <div className="badge dnd-badge"/>;
    return <div className="badge offline-badge"/>;
}

export function StatusBadge({status, children}: StatusBadgeProps) {
    return (
        <Badge overlap="circular" anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
               badgeContent={<StatusIcon status={status}/>}>
            {children}
        </Badge>
    );
}