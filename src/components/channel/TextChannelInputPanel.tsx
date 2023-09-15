import AddCircleIcon from "@mui/icons-material/AddCircle";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import React, {KeyboardEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {ChannelType} from "../../types/channel";
import ApiClient from "../../api/client";
import {addMessage} from "../../states/messages";
import {MessageType} from "../../types/message";
import User from "../../types/user";
import {createSnowflake} from "../../utils";

export const MAX_TEXTAREA_ROWS = 20;

interface InputTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    placeholder?: string | undefined,
    initialText?: string | undefined,
    keyDown?: ((arg0: KeyboardEvent<HTMLTextAreaElement>, arg1: string, arg2: (arg0: string) => void) => void) | undefined,
}

export function TextChannelInputTextarea({placeholder, initialText, keyDown, ...props}: InputTextareaProps) {
    const [rows, setRows] = useState((initialText || "").split("\n").length);
    const [text, setText] = useState(initialText || "");
    const channel = useSelector((state: RootState) => state.channel.selectedChannel);

    let channelName = channel?.type === ChannelType.DM ? `@${channel.recipients![0].username}` : `#${channel?.name}`;

    const setRowsCount = (data: string) => {
        setText(data);
        let rows_l = data.split("\n").length;
        if(rows_l > MAX_TEXTAREA_ROWS)
            rows_l = MAX_TEXTAREA_ROWS;

        setRows(rows_l);
    }

    const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => keyDown && keyDown(e, text, setText);

    return (
        <textarea {...props} className={`channel-input ${props.className ? props.className : ""}`}
                  rows={rows} placeholder={placeholder === undefined ? `Message ${channelName}` : placeholder}
                  onChange={(e) => setRowsCount(e.target.value)}
                  onKeyDown={onKeyDown} value={text}/>
    )
}

export default function TextChannelInputPanel() {
    const me = useSelector((state: RootState) => state.app.me);
    const channel = useSelector((state: RootState) => state.channel.selectedChannel);
    const dispatch = useDispatch();

    const newLineOrSend = (e: KeyboardEvent<HTMLTextAreaElement>, text: string, setText: (arg0: string) => void) => {
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
                <TextChannelInputTextarea keyDown={newLineOrSend}/>
                <GifBoxOutlinedIcon className="channel-input-icon"/>
                <WebAssetIcon className="channel-input-icon"/>
                <EmojiEmotionsIcon className="channel-input-icon"/>
            </div>
        </div>
    );
}