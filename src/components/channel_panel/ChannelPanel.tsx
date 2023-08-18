import '../../styles/channel-panel.css';
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import DmChannelPanel from "./DmChannelPanel";
import GuildChannelPanel from "./GuildChannelPanel";

export default function ChannelPanel() {
    const selectedGuild = useSelector((state: RootState) => state.guild.selectedGuild);

    if (selectedGuild === null)
        return <DmChannelPanel/>;
    else
        return <GuildChannelPanel/>;
}