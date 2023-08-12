import '../../styles/channel-container.css';
import ChannelTitleBar from "./ChannelTitleBar";
import ChannelContent from "./ChannelContent";

export default function ChannelContainer() {
    return (
        <div className="channel-container">
            <ChannelTitleBar/>
            <ChannelContent/>
        </div>
    );
}