import '../../styles/channel-container.css';
import '../../styles/channel-content.css';
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import RelationshipsContent from "./relationships/RelationshipsContent";

export default function ChannelContent() {
    const selectedGuild = useSelector((state: RootState) => state.guild.selectedGuild);
    const selectedChannel = useSelector((state: RootState) => state.channel.selectedChannel);

    if (selectedGuild === null && selectedChannel === null) {
        return <RelationshipsContent/>;
    } else {
        return (
            <div className="channel-content">
                <p><b>Guild or DM channel content</b></p>
            </div>
        );
    }
}