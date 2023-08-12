import React, {useState} from "react";
import Tooltip from '@mui/material/Tooltip';

interface ServerIconProps {
    button?: boolean,
    title?: string,
    image_url?: string,
    svg?: any,
    onClick?: () => void,
}

export default function ServerIcon({button = false, title, image_url, svg, onClick}: ServerIconProps) {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        if (button && onClick) onClick();
        else if (!button) setIsSelected(current => !current);
    }

    return (
        <Tooltip title={title} placement="right" arrow>
            <div
                className={`${button ? "server-icon-button" : "server-icon"} ${isSelected ? "server-icon-selected" : ""}`}
                onClick={handleClick}>
                {button
                    ? <div className={"server-icon-button-wr"}>{svg}</div>
                    : <img src={image_url} alt={"Server icon"}></img>
                }
            </div>
        </Tooltip>
    )
}