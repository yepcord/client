import TagRoundedIcon from "@mui/icons-material/TagRounded";
import {StatusIcon} from "../user/Badges";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {ChannelType} from "../../types/channel";
import {userProfileDialogUserId} from "../dialogs/users/UserProfileDialog";

export default function DmTitleBar() {
    const selectedChannel = useSelector((state: RootState) => state.channel.selectedChannel);
    const recipient = selectedChannel?.type === ChannelType.DM ? selectedChannel?.recipients![0] : null;
    const presence = useSelector((state: RootState) => state.users.presences[recipient?.id!]);
    let status = presence ? presence.status : "offline";

    return (<>
        <div className="channel-titlebar-info">
            <TagRoundedIcon/>
            <div className="channel-titlebar-title cursor-pointer" onClick={() => userProfileDialogUserId.value = selectedChannel!.recipients![0].id}>
                {selectedChannel!.recipients![0].username}
            </div>
            <StatusIcon status={status}/>
        </div>
    </>);
}