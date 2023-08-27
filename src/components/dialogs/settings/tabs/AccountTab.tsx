import Avatar from "../../../user/Avatar";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {Divider} from "@mui/material";
import PrimaryButton from "../../../ui/PrimaryButton";
import DangerButton from "../../../ui/DangerButton";
import SecondaryButton from "../../../ui/SecondaryButton";

export default function AccountTab() {
    const me = useSelector((state: RootState) => state.app.me);

    return (<>
        <h3>My Account</h3>
        <div className="settings-card">
            <div className="settings-card-head">

            </div>
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
                        <SecondaryButton className="button-end">Edit</SecondaryButton>
                    </div>

                    <div className="card-info-row">
                        <div className="card-info-text">
                            <span className="card-text-secondary">PHONE NUMBER</span>
                            <span className="card-profile-username">{me!.phone || "You haven't added a phone number yet."}</span>
                        </div>
                        <SecondaryButton className="button-end">Edit</SecondaryButton>
                    </div>
                </div>
            </div>
        </div>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "20px 0"}}/>

        <h3>Password and Authentication</h3>
        <PrimaryButton>Change Password</PrimaryButton>

        <span className="card-text-secondary">TWO-FACTOR AUTHENTICATION</span>
        <PrimaryButton>Enable Two-Factor Auth</PrimaryButton>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "20px 0"}}/>

        <span className="card-text-secondary">ACCOUNT REMOVAL</span>
        <span className="card-text-secondary font-13">Disabling your account means you can recover it at any time after taking this action.</span>
        <div className="card-info-row">
            <DangerButton>Disable Account</DangerButton>
            <DangerButton outlined={true}>Delete Account</DangerButton>
        </div>
    </>);
}