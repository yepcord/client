import {Channel} from "../../types";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface DmChannelProps {
    channel: Channel,
}

export default function DmChannel({channel}: DmChannelProps) {
    const handleDmChannelDeleteClick = () => {
        //
    };

    return (
        <div className="dm-channel-item">
            <div className="dm-channel-info">
                <div className="dm-channel-icon">
                    <img src={`https://127.0.0.1:8000/media/avatars/200619050972491776/${channel.icon}.webp?size=32`} alt="Channel icon"/>
                </div>
                <div className="dm-channel-name">{channel.name}</div>
            </div>
            <CloseRoundedIcon onClick={handleDmChannelDeleteClick}/>
        </div>
    );
}