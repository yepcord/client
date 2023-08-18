import {useSelector} from "react-redux";
import {RootState} from "../../store";
import DmChannelListItem from "./DmChannelListItem";

export default function DmChannelList() {
    const state = useSelector((state: RootState) => state.channel.dmChannels);

    return <div className="dm-channel-list">{
        Object.values(state).map(item => {
            return <DmChannelListItem channel={item}/>;
        })
    }</div>;
}