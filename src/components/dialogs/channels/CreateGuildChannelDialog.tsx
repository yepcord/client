import Channel, {ChannelType} from "../../../types/channel";
import {Dialog} from "@mui/material";
import React, {useState} from "react";
import RadioOption from "../../ui/RadioOption";
import TransparentSecondaryButton from "../../ui/TransparentSecondaryButton";
import PrimaryButton from "../../ui/PrimaryButton";
import ApiClient from "../../../api/client";

interface Props {
    guild_id: string,
    parent?: Channel | null,
    open: boolean,
    close: () => void,
}

export default function CreateGuildChannelDialog({guild_id, parent, open, close}: Props) {
    const [type, setType] = useState<ChannelType.GUILD_TEXT | ChannelType.GUILD_VOICE>(ChannelType.GUILD_TEXT);
    const [name, setName] = useState("");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let text = e.target.value;
        text = text.replaceAll(" ", "-");
        setName(text);
    }

    const handleSubmit = () => {
        ApiClient.createGuildChannel(guild_id, name, type, parent ? parent.id : null).then(resp => {
            // TODO: handle errors
            close();
            setName("");
        })
    }

    return (
        <Dialog open={open} onClose={close} sx={{
            "& .MuiPaper-root": {
                backgroundColor: "transparent",
            }
        }}>
            <div className="channel-create-dialog">
                <div className="channel-create-dialog-title">
                    <h3 className="text-main">Create Channel</h3>
                    {parent && <span className="text-secondary text-14">in {parent.name}</span>}
                </div>

                <span className="text-primary text-14">Channel type</span>

                <RadioOption checked={type === ChannelType.GUILD_TEXT} onClick={() => setType(ChannelType.GUILD_TEXT)}
                             title="Text" description="Send messages, images, GIFs, emoji."/>

                <RadioOption  checked={type === ChannelType.GUILD_VOICE} onClick={() => setType(ChannelType.GUILD_VOICE)}
                             title="Voice" description="Hang out together with voice, video and screen share."/>

                <div className="input-container">
                    <label className="text-main">
                        Channel name
                    </label>
                    <input name="name" type="text" className="input-primary" onChange={handleNameChange} value={name}
                           placeholder="new-channel" required={true}/>
                </div>

                <div className="edit-settings-dialog-bottom-buttons">
                    <TransparentSecondaryButton onClick={close}>Cancel</TransparentSecondaryButton>
                    <PrimaryButton onClick={handleSubmit}>Create</PrimaryButton>
                </div>
            </div>
        </Dialog>
    );
}