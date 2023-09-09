import {DialogProps} from "@mui/material/Dialog/Dialog";
import {Dialog, Divider} from "@mui/material";
import PrimaryButton from "../../ui/PrimaryButton";
import React, {useRef, useState} from "react";
import SecondaryButton from "../../ui/SecondaryButton";
import TransparentSecondaryButton from "../../ui/TransparentSecondaryButton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {PUBLIC_URL} from "../../../constants";
import ApiClient, {ErrorResponse} from "../../../api/client";
import {GuildCreateHandlerData} from "../../../ws/gateway/handlers/dispatch/guild_create";
import {replaceSnowflakeArrWithObj} from "../../../utils";
import Channel from "../../../types/channel";
import Snowflake from "../../../types/snowflake";
import {addGuild} from "../../../states/guilds";
import Guild from "../../../types/guild";
import {useNavigate} from "react-router-dom";

interface Props extends DialogProps {
    setOpen: (arg0: boolean) => void,
}

export default function CreateOrJoinGuildDialog({setOpen, ...props}: Props) {
    const me = useSelector((state: RootState) => state.app.me);
    const [createOpen, setCreateOpen] = useState(false);
    const [joinOpen, setJoinOpen] = useState(false);
    const [guildName, setGuildName] = useState(`${me!.username}'s guild`);
    const [createError, setCreateError] = useState("");
    const [joinError, setJoinError] = useState("");
    const inviteRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const createMyOwn = () => {
        setOpen(false);
        setCreateOpen(true);
    }
    const joinAGuild = () => {
        setOpen(false);
        setJoinOpen(true);
    }

    const back = (type: "create" | "join") => () => {
        type === "create" ? setCreateOpen(false) : setJoinOpen(false);
        setOpen(true)
    }

    const submitCreate = () => {
        ApiClient.createGuild(guildName).then(resp => {
            if(resp.status === 200) {
                const guild = resp.body as GuildCreateHandlerData;
                guild.channels = replaceSnowflakeArrWithObj(guild.channels as unknown as Channel[]);
                guild.roles = replaceSnowflakeArrWithObj(guild.roles as unknown as Snowflake[]);

                dispatch(addGuild(guild as Guild));

                navigate(`/channels/${guild.id}/${guild.system_channel_id}`);
                setCreateOpen(false);
            } else if(resp.status >= 500) {
                setCreateError("Unknown server error. Please, try again.");
            } else if(resp.status >= 400) {
                const errors = (resp.body as ErrorResponse).errors;
                errors && setCreateError(errors.name._errors[0].message);
            }
        });
    }

    const submitJoin = () => {
        inviteRef.current?.value && ApiClient.joinInvite(inviteRef.current?.value).then(resp => {
            if(resp.status === 200) {
                setJoinOpen(false);
            } else if(resp.status >= 500) {
                setJoinError("Unknown server error. Please, try again.");
            } else if(resp.status >= 400) {
                const error = resp.body as ErrorResponse;
                error.message && setJoinError(error.message);
            }
        });
    }

    const createErr = () => createError ? " - " + createError : null;
    const joinErr = () => joinError ? " - " + joinError : null;

    return (<>
        <Dialog onClose={() => setOpen(false)} {...props} sx={{"& .MuiPaper-root": {backgroundColor: "transparent"}}}>
            <div className="add-guild-dialog">
                <div className="center">
                    <h2>Create a guild</h2>
                    <span className="text-secondary">Your guild is where you and your friends hang out. Make yours and start talking</span>
                </div>
                <PrimaryButton wide={true} onClick={createMyOwn}>Create My Own</PrimaryButton>

                <Divider flexItem sx={{backgroundColor: "var(--theme-3)", margin: "10px 0"}}/>

                <div className="center">
                    <h2>Have an invite already?</h2>
                </div>
                <SecondaryButton wide={true} onClick={joinAGuild}>Join a Guild</SecondaryButton>
            </div>
        </Dialog>

        <Dialog open={createOpen} onClose={() => setCreateOpen(false)} sx={{"& .MuiPaper-root": {backgroundColor: "transparent"}}}>
            <div className="add-guild-dialog">
                <div className="center">
                    <h2>Customize your guild</h2>
                    <span className="text-secondary">Give your new guild a personality with a name. You can always change it later.</span>
                </div>

                <div className="input-container">
                    <label style={{color: createErr() ? "red" : ""}} className="text-secondary">
                        Guild name
                        <span className="required-asterisk">{createErr()}</span>
                    </label>
                    <input name="name" type="text" className="input-primary" value={guildName} onChange={(e) => setGuildName(e.target.value)} required={true}/>
                </div>

                <Divider flexItem sx={{backgroundColor: "var(--theme-3)", margin: "10px 0"}}/>

                <div className="edit-settings-dialog-bottom-buttons">
                    <TransparentSecondaryButton onClick={back("create")}>Back</TransparentSecondaryButton>
                    <PrimaryButton onClick={submitCreate} disabled={!guildName}>Create</PrimaryButton>
                </div>
            </div>
        </Dialog>

        <Dialog open={joinOpen} onClose={() => setJoinOpen(false)} sx={{"& .MuiPaper-root": {backgroundColor: "transparent"}}}>
            <div className="add-guild-dialog">
                <div className="center">
                    <h2>Join a Guild</h2>
                    <span className="text-secondary">Enter an invite below to join an existing guild</span>
                </div>

                <div className="input-container">
                    <label style={{color: joinErr() ? "red" : ""}} className="text-primary">
                        Invite link
                        <span className="required-asterisk">{joinErr()}</span>
                    </label>
                    <input name="name" type="text" className="input-primary" ref={inviteRef} required={true}
                    placeholder={`${PUBLIC_URL}/invite/hTKzmak`}/>
                </div>

                <div style={{display: "flex", flexDirection: "column"}}>
                    <span className="text-primary">Invites should look like:</span>
                    <span className="text-secondary text-14">hTKzmak</span>
                    <span className="text-secondary text-14">{`${PUBLIC_URL}/invite/hTKzmak`}</span>
                </div>


                <Divider flexItem sx={{backgroundColor: "var(--theme-3)", margin: "10px 0"}}/>

                <div className="edit-settings-dialog-bottom-buttons">
                    <TransparentSecondaryButton onClick={back("join")}>Back</TransparentSecondaryButton>
                    <PrimaryButton onClick={submitJoin} disabled={!guildName}>Join Guild</PrimaryButton>
                </div>
            </div>
        </Dialog>
    </>);
}