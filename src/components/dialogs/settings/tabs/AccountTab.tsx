import Avatar from "../../../user/Avatar";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {Divider} from "@mui/material";

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
                    <button className="btn-primary button-end">Edit User Profile</button>
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
                        <button className="btn-secondary button-end">Edit</button>
                    </div>

                    <div className="card-info-row">
                        <div className="card-info-text">
                            <span className="card-text-secondary">EMAIL</span>
                            <span className="card-profile-username">{me!.email}</span>
                        </div>
                        <button className="btn-secondary button-end">Edit</button>
                    </div>

                    <div className="card-info-row">
                        <div className="card-info-text">
                            <span className="card-text-secondary">PHONE NUMBER</span>
                            <span className="card-profile-username">{me!.phone || "You haven't added a phone number yet."}</span>
                        </div>
                        <button className="btn-secondary button-end">Edit</button>
                    </div>
                </div>
            </div>
        </div>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "20px 0"}}/>

        <h3>Password and Authentication</h3>
        <button className="btn-primary">Change Password</button>

        <span className="card-text-secondary">TWO-FACTOR AUTHENTICATION</span>
        <button className="btn-primary">Enable Two-Factor Auth</button>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "20px 0"}}/>

        <span className="card-text-secondary">ACCOUNT REMOVAL</span>
        <span className="card-text-secondary font-13">Disabling your account means you can recover it at any time after taking this action.</span>
        <div className="card-info-row">
            <button className="btn-danger">Disable Account</button>
            <button className="btn-danger btn-danger-outline">Delete Account</button>
        </div>
    </>);
}