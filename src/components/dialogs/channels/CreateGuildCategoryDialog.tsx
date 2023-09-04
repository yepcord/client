import {ChannelType} from "../../../types/channel";
import {Dialog} from "@mui/material";
import React, {useRef} from "react";
import TransparentSecondaryButton from "../../ui/TransparentSecondaryButton";
import PrimaryButton from "../../ui/PrimaryButton";
import ApiClient from "../../../api/client";

interface Props {
    guild_id: string,
    open: boolean,
    close: () => void,
}

export default function CreateGuildCategoryDialog({guild_id, open, close}: Props) {
    const nameRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = () => {
        ApiClient.createGuildChannel(guild_id, nameRef.current!.value, ChannelType.GUILD_CATEGORY, null).then(resp => {
            // TODO: handle errors
            close();
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
                    <h3 className="text-main">Create Category</h3>
                </div>

                <div className="input-container">
                    <label className="text-main">
                        Category name
                    </label>
                    <input name="name" type="text" className="input-primary" ref={nameRef} placeholder="New Category" required={true}/>
                </div>

                <div className="edit-settings-dialog-bottom-buttons">
                    <TransparentSecondaryButton onClick={close}>Cancel</TransparentSecondaryButton>
                    <PrimaryButton onClick={handleSubmit}>Create</PrimaryButton>
                </div>
            </div>
        </Dialog>
    );
}