import AddCircleIcon from "@mui/icons-material/AddCircle";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {ChannelType} from "../../types/channel";

const MAX_TEXTAREA_ROWS = 20;

export default function TextChannelInputPanel() {
    const [rows, setRows] = useState(1);
    const [text, setText] = useState("");
    const channel = useSelector((state: RootState) => state.channel.selectedChannel);

    let channelName = channel?.type === ChannelType.DM ? `@${channel.recipients![0].username}` : `#${channel?.name}`;

    const setRowsCount = (data: string) => {
        setText(data);
        let rows_l = data.split("\n").length;
        if(rows_l > MAX_TEXTAREA_ROWS)
            rows_l = MAX_TEXTAREA_ROWS;

        setRows(rows_l);
    }

    return (
        <div className="channel-input-container-1">
            <div className="channel-input-container-2">
                <AddCircleIcon className="channel-input-icon"/>
                <textarea className="channel-input" rows={rows} placeholder={`Message ${channelName}`}
                          onChange={(e) => setRowsCount(e.target.value)}/>
                <GifBoxOutlinedIcon className="channel-input-icon"/>
                <WebAssetIcon className="channel-input-icon"/>
                <EmojiEmotionsIcon className="channel-input-icon"/>
            </div>
        </div>
    );
}