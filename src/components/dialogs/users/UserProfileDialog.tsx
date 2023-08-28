import "../../../styles/profile_dialog.css";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {setUserProfileDialog} from "../../../states/app";
import {Dialog, Menu} from "@mui/material";
import Avatar from "../../user/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {RelationshipType} from "../../../types/user";
import ApiClient from "../../../api/client";
import {dmChannelByUserId} from "../../../utils";
import {useNavigate} from "react-router-dom";
import SuccessButton from "../../ui/SuccessButton";
import SecondaryButton from "../../ui/SecondaryButton";
import TransparentDangerButton from "../../ui/TransparentDangerButton";
import React, {useState} from "react";
import TransparentPrimaryButton from "../../ui/TransparentPrimaryButton";

export default function UserProfileDialog() {
    const selectedUserId = useSelector((state: RootState) => state.app.profileDialogUserId)
    const user = useSelector((state: RootState) => selectedUserId ? state.users.users[selectedUserId] : null);
    const relationship = useSelector((state: RootState) => selectedUserId ? state.users.relationships[selectedUserId] : null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const open = user !== null;

    const [anchorElMenu, setAnchorElMenu] = useState<null | SVGSVGElement>(null);
    const menuOpen = Boolean(anchorElMenu);
    const closeMenu = () => {
        setAnchorElMenu(null);
    };

    const close = () => {
        dispatch(setUserProfileDialog(null));
    }

    let buttons = <></>;
    let menuEntries = <></>;
    if (relationship === null || relationship === undefined) {
        buttons = (
            <SuccessButton onClick={() => ApiClient.requestRelationship(user!.username, user!.discriminator)}>
                Send Friend Request
            </SuccessButton>
        );
    } else if (relationship.type === RelationshipType.REQUEST_RECEIVED) {
        buttons = (<>
            <SuccessButton onClick={() => ApiClient.acceptRelationship(user!.id)}>Accept</SuccessButton>
            <SecondaryButton onClick={() => ApiClient.deleteRelationship(user!.id)}>Ignore</SecondaryButton>
        </>);
    } else if (relationship.type === RelationshipType.REQUEST_SENT) {
        buttons = <SuccessButton disabled>Friend Request Sent</SuccessButton>;
    } else if (relationship.type === RelationshipType.FRIEND) {
        buttons = (
            <SuccessButton onClick={() => {
                dmChannelByUserId(user!.id).then(channel => {
                    if (channel === null) return;
                    navigate(`/channels/@me/${channel.id}`);
                    close();
                });
            }}>
                Send Message
            </SuccessButton>
        );
    }

    if (relationship === null || relationship === undefined || [RelationshipType.REQUEST_SENT, RelationshipType.REQUEST_RECEIVED, RelationshipType.FRIEND].includes(relationship.type)) {
        menuEntries = (<>
            {relationship?.type === RelationshipType.FRIEND
                && <TransparentDangerButton className="btn-color-danger w-100"
                                            onClick={() => ApiClient.deleteRelationship(user!.id)}>
                    Remove Friend
                </TransparentDangerButton>
            }

            <TransparentDangerButton className="btn-color-danger w-100" onClick={() => {
                ApiClient.blockUser(user!.id).then();
                closeMenu();
            }}>
                Block
            </TransparentDangerButton>
            <TransparentPrimaryButton className="w-100" onClick={() => {
                dmChannelByUserId(user!.id).then(channel => {
                    if (channel === null) return;
                    navigate(`/channels/@me/${channel.id}`);
                });
            }}>
                Message
            </TransparentPrimaryButton>
        </>);
    } else if (relationship.type === RelationshipType.BLOCK) {
        menuEntries = (
            <TransparentPrimaryButton className="w-100" onClick={() => ApiClient.deleteRelationship(user!.id)}>
                Unblock
            </TransparentPrimaryButton>
        );
    }

    return (<>
        <Dialog open={open} onClose={close} sx={{
            "& .MuiPaper-root": {
                backgroundColor: "transparent",
            }
        }}>
            <div className="profile-dialog">
                <div className="profile-dialog-banner">

                </div>
                <div className="profile-dialog-content">
                    <div className="profile-dialog-badges-btns">
                        <div className="profile-dialog-avatar">
                            {open && <Avatar user={user!} size={64}/>}
                        </div>
                        <div className="profile-dialog-btns">
                            {buttons}
                            <MoreVertIcon className="btn-icon" onClick={(e) => setAnchorElMenu(e.currentTarget)}/>
                        </div>
                    </div>
                    <div className="profile-dialog-info-card">
                        <div className="card-profile-fusername">
                            <h3>{user?.username}</h3>
                            <h3 className="card-profile-discriminator">#{user?.discriminator}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <Menu open={menuOpen} onClose={closeMenu} anchorEl={anchorElMenu}
                  slotProps={{paper: {sx: {width: "175px", backgroundColor: "var(--theme-1)", padding: "0 10px"}}}}>
                {menuEntries}
            </Menu>
        </Dialog>
    </>);
}