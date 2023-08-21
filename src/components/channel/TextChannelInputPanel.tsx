import AddCircleIcon from "@mui/icons-material/AddCircle";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import {KeyboardEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {ChannelType} from "../../types/channel";
import ApiClient from "../../api/client";
import {addMessage} from "../../states/messages";
import {MessageType} from "../../types/message";
import User from "../../types/user";
import {createSnowflake} from "../../utils";

const MAX_TEXTAREA_ROWS = 20;

export default function TextChannelInputPanel() {
    const [rows, setRows] = useState(1);
    const [text, setText] = useState("");
    const channel = useSelector((state: RootState) => state.channel.selectedChannel);
    const me = useSelector((state: RootState) => state.app.me);
    const dispatch = useDispatch();

    let channelName = channel?.type === ChannelType.DM ? `@${channel.recipients![0].username}` : `#${channel?.name}`;

    const setRowsCount = (data: string) => {
        setText(data);
        let rows_l = data.split("\n").length;
        if(rows_l > MAX_TEXTAREA_ROWS)
            rows_l = MAX_TEXTAREA_ROWS;

        setRows(rows_l);
    }

    const newLineOrSend = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            if(!text) return;

            const nonce = createSnowflake();
            dispatch(addMessage({
                id: nonce,
                channel_id: channel!.id,
                content: text,
                author: me as User,
                type: MessageType.DEFAULT,
                timestamp: new Date(Date.now()).toISOString(),
            }));
            ApiClient.postMessages({
                channel_id: channel!.id,
                content: text,
                nonce: nonce,
            }).then()
            setText("");
        }
    }

    return (
        <div className="channel-input-container-1">
            <div className="channel-input-container-2">
                <AddCircleIcon className="channel-input-icon"/>
                <textarea className="channel-input" rows={rows} placeholder={`Message ${channelName}`}
                          onChange={(e) => setRowsCount(e.target.value)}
                          onKeyDown={newLineOrSend} value={text}/>
                <GifBoxOutlinedIcon className="channel-input-icon"/>
                <WebAssetIcon className="channel-input-icon"/>
                <EmojiEmotionsIcon className="channel-input-icon"/>
            </div>
        </div>
    );
}