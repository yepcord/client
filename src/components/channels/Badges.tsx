import '../../styles/badges.css';
import {Badge} from "@mui/material";

interface StatusBadgeProps {
    status: "online" | "offline" | "idle" | "dnd",
    children: React.ReactNode
}

export function StatusBadge({status, children}: StatusBadgeProps) {
    let content = <div className="badge offline-badge"/>;
    if(status === "online")
        content = <div className="badge online-badge"/>;
    if(status === "idle")
        content = <div className="badge idle-badge"/>;
    if(status === "dnd")
        content = <div className="badge dnd-badge"/>;

    return (
        <Badge overlap="circular" anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
               badgeContent={content}>
            {children}
        </Badge>
    );
}