import {useSelector} from "react-redux";
import {RootState} from "../../store";
import Avatar from "../user/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import HeadphonesRoundedIcon from "@mui/icons-material/HeadphonesRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import {dialogSettingsTab} from "../dialogs/settings/SettingsDialog";

export default function ProfilePanel() {
    const user = useSelector((state: RootState) => state.app.me);

    return (
        <div className="profile-panel">
            <div className="profile-panel-user">
                <Avatar user={user!}/>
                <Tooltip title="Click to copy username">
                    <div className="profile-panel-username"
                         onClick={() => navigator.clipboard.writeText(`${user!.username}#${user!.discriminator}`)}>
                        <span style={{color: "#ffffff"}}><b>{user!.username}</b></span>
                        <span style={{color: "#a1a1a1"}}>#{user!.discriminator}</span>
                    </div>
                </Tooltip>
            </div>
            <div className="profile-panel-buttons">
                <MicRoundedIcon/>
                <HeadphonesRoundedIcon/>
                <SettingsRoundedIcon onClick={() => dialogSettingsTab.value = "account"}/>
            </div>
        </div>
    );
}