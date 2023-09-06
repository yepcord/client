import React, {useRef, useState} from "react";
import Banner from "../../../user/Banner";
import Avatar from "../../../user/Avatar";
import {Divider} from "@mui/material";
import {useSelector} from "react-redux";
import store, {RootState} from "../../../../store";
import PrimaryButton from "../../../ui/PrimaryButton";
import TransparentPrimaryButton from "../../../ui/TransparentPrimaryButton";
import UploadUserImageDialog from "./dialogs/UploadUserImageDialog";
import ApiClient from "../../../../api/client";

export default function ProfilesTab() {
    const static_me = store.getState().app.me!;
    const me = useSelector((state: RootState) => state.app.me);
    const [changes, setChanges] = useState({bio: static_me.bio, accent_color: static_me.accent_color});
    const avatarFile = useRef<HTMLInputElement>(null);
    const bannerFile = useRef<HTMLInputElement>(null);
    const [avatarImage, setAvatarImage] = useState<string | null>(null);
    const [bannerImage, setBannerImage] = useState<string | null>(null);

    const int2color = (i: number) => {
        let color = i.toString(16);
        color = color.length < 6 ? color.padStart(6, "0") : color;
        color = `#${color}`;
        return color;
    }
    const color2int = (color: string) => {
        color = color.replace("#", "");
        return parseInt(color, 16);
    }

    const setBannerColor = (color: string) => {
        setChanges(prev => ({...prev, accent_color: color2int(color)}));
    }

    const setImageB64 = (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            type === "avatar" ? setAvatarImage(reader.result as string) : setBannerImage(reader.result as string);
        };
    }

    const removeImage = (type: string) => () => {
        type === "avatar"
            ? ApiClient.editMe({avatar: null}).then()
            : ApiClient.editProfile({banner: null}).then();
    }

    return (<>
        <input type="file" ref={avatarFile} style={{display: "none"}} accept="image/png, image/jpeg, image/gif, image/webp" onChange={setImageB64("avatar")}/>
        <input type="file" ref={bannerFile} style={{display: "none"}} accept="image/png, image/jpeg, image/gif, image/webp" onChange={setImageB64("banner")}/>
        <UploadUserImageDialog type="avatar" image={avatarImage} close={() => setAvatarImage(null)}/>
        <UploadUserImageDialog type="banner" image={bannerImage} close={() => setBannerImage(null)}/>
        <h2>Profiles</h2>
        <div className="settings-profiles-user">
            <div className="settings-profiles-user-col">
                <span className="card-text-secondary">Avatar</span>

                <div className="card-info-row margin-0">
                    <PrimaryButton onClick={() => avatarFile.current?.click()}>Change Avatar</PrimaryButton>
                    {me!.avatar && <TransparentPrimaryButton onClick={removeImage("avatar")}>Remove Avatar</TransparentPrimaryButton>}
                </div>

                <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "20px 0"}}/>

                <span className="card-text-secondary">Profile Banner</span>
                <span className="card-text-secondary text-14">We recommend an image of at leas 600x240. You can upload a PNG, JPG, or an animated GIF under 10MB.</span>

                <div className="card-info-row margin-0">
                    <PrimaryButton onClick={() => bannerFile.current?.click()}>Change Banner</PrimaryButton>
                    {me!.banner && <TransparentPrimaryButton onClick={removeImage("banner")}>Remove Banner</TransparentPrimaryButton>}
                </div>

                <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "20px 0"}}/>

                <span className="card-text-secondary">Banner Color</span>
                <input type="color" className="input-color"
                       value={changes.accent_color ? int2color(changes.accent_color) : "#000"}
                       onChange={(e) => setBannerColor(e.target.value)}/>

                <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "20px 0"}}/>

                <span className="card-text-secondary">About Me</span>
                <div style={{backgroundColor: "var(--theme-1)", padding: 5, borderRadius: 7}}>
                    <textarea className="channel-input w-100" rows={7} value={changes.bio}
                              onChange={(e) => setChanges(prev => ({...prev, bio: e.target.value}))}/>
                </div>
            </div>

            <div className="settings-profiles-user-col">
                <span className="card-text-secondary">Preview</span>

                <Banner user={me!} height={50}/>
                <div className="profile-dialog-content">
                    <div className="profile-dialog-badges-btns">
                        <Avatar user={me!} size={64} divClassName="cursor-pointer"
                                onClick={() => avatarFile.current?.click()}/>
                    </div>
                    <div className="profile-dialog-info-card">
                        <div className="card-profile-fusername">
                            <h3>{me!.username}</h3>
                            <h3 className="card-profile-discriminator">#{me!.discriminator}</h3>
                        </div>

                        <Divider flexItem sx={{backgroundColor: "var(--theme-3)", margin: "10px 0"}}/>

                        {changes.bio &&
                            <div className="card-info-row" style={{margin: "7px 0"}}>
                                <div className="card-info-text text-14">
                                    <span className="text-main text-bold">ABOUT ME</span>
                                    <span className="text-secondary selectable">{changes.bio}</span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </>);
}