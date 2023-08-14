import Channel, {ChannelType} from "../../types/channel";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Avatar from "./Avatar";
import ChannelIcon from "./ChannelIcon";
import {useNavigate} from "react-router-dom";

interface DmChannelProps {
    channel: Channel,
}

export default function DmChannel({channel}: DmChannelProps) {
    const navigate = useNavigate();
    const handleDmChannelDeleteClick = () => {
        //
    };

    return (
        <div className="dm-channel-item" onClick={() => navigate(`/channels/@me/${channel.id}`)}>
            <div className="dm-channel-info">
                {channel.type === ChannelType.DM
                    ? <Avatar user={channel.recipients![0]} status="online"/>
                    : <ChannelIcon channel={channel}/>
                }
                <div className="dm-channel-name">
                    {channel.type === ChannelType.DM
                        ? channel.recipients![0].username
                        : channel.name
                    }
                </div>
            </div>
            <CloseRoundedIcon onClick={handleDmChannelDeleteClick}/>
        </div>
    );
}