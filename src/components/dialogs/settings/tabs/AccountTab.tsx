import {useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {Dialog, Divider} from "@mui/material";
import DangerButton from "../../../ui/DangerButton";
import PrimaryButton from "../../../ui/PrimaryButton";
import Banner from "../../../user/Banner";
import Avatar from "../../../user/Avatar";
import SecondaryButton from "../../../ui/SecondaryButton";
import React, {useState} from "react";
import EditEmailDialog from "./dialogs/EditEmailDialog";
import EditPasswordDialog from "./dialogs/EditPasswordDialog";


export default function AccountTab() {
    const me = useSelector((state: RootState) => state.app.me);

    const [accountDialogType, setAccountDialogContent] = useState<"edit_email" | "edit_password" | null>(null);
    const accountDialogOpen = accountDialogType !== null;
    const accountDialogClose = () => setAccountDialogContent(null);

    const accountDialogs = {
        edit_email: <EditEmailDialog close={accountDialogClose}/>,
        edit_password: <EditPasswordDialog close={accountDialogClose}/>,
    }

    return (<>
        <h3>My Account</h3>
        <div className="settings-card">
            <Banner user={me!}/>
            <div className="settings-card-body">
                <div className="settings-card-profile-info">
                    <Avatar user={me!} size={48}/>
                    <div className="card-profile-fusername">
                        <h3 className="card-profile-username">{me!.username}</h3>
                        <h3 className="card-profile-discriminator">#{me!.discriminator}</h3>
                    </div>
                    <PrimaryButton className="button-end">Edit User Profile</PrimaryButton>
                </div>
                <div className="card-secondary">
                    <div className="card-info-row">
                        <div className="card-info-text">
                            <span className="card-text-secondary">USERNAME</span>
                            <div className="card-profile-fusername">
                                <span className="card-profile-username">{me!.username}</span>
                                <span className="card-profile-discriminator">#{me!.discriminator}</span>
                            </div>
                        </div>
                        <SecondaryButton className="button-end">Edit</SecondaryButton>
                    </div>

                    <div className="card-info-row">
                        <div className="card-info-text">
                            <span className="card-text-secondary">EMAIL</span>
                            <span className="card-profile-username">{me!.email}</span>
                        </div>
                        <SecondaryButton className="button-end"
                                         onClick={() => setAccountDialogContent("edit_email")}>Edit</SecondaryButton>
                    </div>

                    <div className="card-info-row">
                        <div className="card-info-text">
                            <span className="card-text-secondary">PHONE NUMBER</span>
                            <span
                                className="card-profile-username">{me!.phone || "You haven't added a phone number yet."}</span>
                        </div>
                        <SecondaryButton className="button-end">Edit</SecondaryButton>
                    </div>
                </div>
            </div>
        </div>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "20px 0"}}/>

        <h3>Password and Authentication</h3>
        <PrimaryButton onClick={() => setAccountDialogContent("edit_password")}>Change Password</PrimaryButton>

        <span className="card-text-secondary">TWO-FACTOR AUTHENTICATION</span>
        <PrimaryButton>Enable Two-Factor Auth</PrimaryButton>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "20px 0"}}/>

        <span className="card-text-secondary">ACCOUNT REMOVAL</span>
        <span className="card-text-secondary font-13">Disabling your account means you can recover it at any time after taking this action.</span>
        <div className="card-info-row">
            <DangerButton>Disable Account</DangerButton>
            <DangerButton outlined={true}>Delete Account</DangerButton>
        </div>

        <Dialog open={accountDialogOpen} onClose={accountDialogClose}
                sx={{"& .MuiPaper-root": {backgroundColor: "transparent"}}}>
            {accountDialogType ? accountDialogs[accountDialogType] : null}
        </Dialog>
    </>);
}