import {Dialog, Divider} from "@mui/material";
import React, {useState} from "react";
import {DialogProps} from "@mui/material/Dialog/Dialog";
import Cropper from "react-easy-crop";
import {Area} from "react-easy-crop/types";
import TransparentSecondaryButton from "../../../../ui/TransparentSecondaryButton";
import PrimaryButton from "../../../../ui/PrimaryButton";
import {getCroppedImg} from "../../../../../utils";
import ApiClient from "../../../../../api/client";
import {Response} from "../../../../../api/client";

interface Props {
    type: "avatar" | "banner",
    image: string | null,
    close: () => void,
    dialog?: DialogProps
}

export default function UploadUserImageDialog({type, image, close, dialog}: Props) {
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [outImage, setOutImage] = useState(image);

    const handleSubmit = () => {
        if(!outImage) return;
        const callback = (resp: Response) => {
            // TODO: handle errors
            close();
        }
        type === "avatar"
            ? ApiClient.editMe({avatar: outImage}).then(callback)
            : ApiClient.editProfile({banner: outImage}).then(callback);
    }

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => getCroppedImg(image!, croppedAreaPixels).then(img => setOutImage(img));

    return (
        <Dialog {...dialog} open={image !== null} onClose={close} sx={{"& .MuiPaper-root": {backgroundColor: "transparent"}}}>
            <div className="image-upload-dialog">
                <div className="channel-create-dialog-title">
                    <h3 className="text-main">Edit Image</h3>
                </div>

                <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

                <div className="image-upload-crop-container">
                    <Cropper
                        image={image!}
                        crop={crop}
                        zoom={zoom}
                        aspect={type === "avatar" ? 1 : (5 / 2)}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        showGrid={false}
                        style={{containerStyle: {height: "300px", position: "relative"}, cropAreaStyle: {height: "150px"}}}
                    />
                </div>

                <input className="input-slider" type="range" value={zoom} min={1} max={3} step={.1} onChange={(e) => setZoom(Number(e.target.value))}/>

                <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

                <div className="edit-settings-dialog-bottom-buttons">
                    <TransparentSecondaryButton onClick={close}>Cancel</TransparentSecondaryButton>
                    <PrimaryButton onClick={handleSubmit}>Apply</PrimaryButton>
                </div>
            </div>
        </Dialog>
    );
}