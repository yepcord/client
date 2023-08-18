import Channel from "../../types/channel";
import TagIcon from "@mui/icons-material/Tag";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

interface TextChannelProps {
    channel: Channel,
}

export default function TextChannel({channel}: TextChannelProps) {
    const selected = useSelector((state: RootState) => state.channel.selectedChannel);
    const navigate = useNavigate();

    return (
        <div className="channel-panel-item-container">
            <button className={`btn-secondary-transparent margin-tb-10px channel-panel-item ${selected?.id === channel.id && "btn-secondary-transparent-selected"}`}
                    onClick={() => navigate(`/channels/${channel.guild_id}/${channel.id}`)}>
                <div className="channel-panel-item-name">
                    <TagIcon/>
                    {channel.name}
                </div>
            </button>
        </div>
    );
}