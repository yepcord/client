import Channel, {ChannelType} from "../../types/channel";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Avatar from "../user/Avatar";
import ChannelIcon from "./ChannelIcon";
import {useNavigate} from "react-router-dom";
import ApiClient from "../../api/client";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

interface DmChannelProps {
    channel: Channel,
}

export default function DmChannelListItem({channel}: DmChannelProps) {
    const navigate = useNavigate();
    const selectedChannel = useSelector((state: RootState) => state.channel.selectedChannel);

    const handleDmChannelDeleteClick = () => {
        if (channel.type === ChannelType.DM) {
            ApiClient.deleteChannel(channel.id);
            if (selectedChannel?.id === channel.id) navigate("/channels/@me");
        }
    };

    return (
        <div className="dm-channel-item" onClick={() => navigate(`/channels/@me/${channel.id}`)}>
            <div className="dm-channel-info">
                {channel.type === ChannelType.DM
                    ? <Avatar user={channel.recipients![0]}/>
                    : <ChannelIcon channel={channel}/>
                }
                <div className="dm-channel-name">
                    {channel.type === ChannelType.DM
                        ? channel.recipients![0].username
                        : channel.name
                    }
                </div>
            </div>
            <CloseRoundedIcon onClick={(e) => {
                e.stopPropagation();
                handleDmChannelDeleteClick();
            }}/>
        </div>
    );
}