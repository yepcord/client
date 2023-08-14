import React from "react";
import Tooltip from '@mui/material/Tooltip';

interface ServerIconProps {
    button?: boolean,
    title?: string,
    image_url?: string,
    svg?: any,
    onClick?: () => void,
    selected?: boolean,
}

export default function ServerIcon({button = false, title, image_url, svg, onClick, selected}: ServerIconProps) {
    return (
        <Tooltip title={title} placement="right" arrow>
            <div
                className={`${button ? "server-icon-button" : "server-icon"} ${selected ? "server-icon-selected" : ""}`}
                onClick={onClick}>
                {button
                    ? <div className={"server-icon-button-wr"}>{svg}</div>
                    : <img src={image_url} alt={"Server icon"}></img>
                }
            </div>
        </Tooltip>
    )
}