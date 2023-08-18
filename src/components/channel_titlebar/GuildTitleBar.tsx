import TagRoundedIcon from "@mui/icons-material/TagRounded";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

export default function GuildTitleBar() {
    const selectedChannel = useSelector((state: RootState) => state.channel.selectedChannel);

    return (<>
        <div className="channel-titlebar-info">
            <TagRoundedIcon/>
            <div className="channel-titlebar-title">{selectedChannel!.name}</div>
        </div>
    </>);
}