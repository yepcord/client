import TagRoundedIcon from "@mui/icons-material/TagRounded";
import {StatusIcon} from "../channels/Badges";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {ChannelType} from "../../types/channel";

export default function DmTitleBar() {
    const selectedChannel = useSelector((state: RootState) => state.channel.selectedChannel);
    const recipient = selectedChannel?.type === ChannelType.DM ? selectedChannel?.recipients![0] : null;
    const presence = useSelector((state: RootState) => state.users.presences[recipient?.id!]);
    let status = presence ? presence.status : "offline";

    return (<>
        <div className="channel-titlebar-info">
            <TagRoundedIcon/>
            <div className="channel-titlebar-title">{selectedChannel!.recipients![0].username}</div>
            <StatusIcon status={status}/>
        </div>
    </>);
}