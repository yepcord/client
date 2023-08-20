import '../../styles/channel-container.css';
import '../../styles/channel-content.css';
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import RelationshipsContent from "./relationships/RelationshipsContent";
import TextChannelContent from "./TextChannelContent";

export default function ChannelContent() {
    const selectedGuild = useSelector((state: RootState) => state.guild.selectedGuild);
    const selectedChannel = useSelector((state: RootState) => state.channel.selectedChannel);

    if (selectedGuild === null && selectedChannel === null) {
        return <RelationshipsContent/>;
    } else {
        return <TextChannelContent/>;
    }
}