import CheckboxOption from "../../../ui/CheckboxOption";
import {Divider} from "@mui/material";
import {useState} from "react";
import {INSTANCE_NAME} from "../../../../constants";

export default function StreamerModeTab() {
    const [checkboxes, setCheckboxes] = useState({
        enable: false,
        hide_personal_info: false,
        hide_invites: false,
        disable_sounds: false,
        disable_notifications: false,
    });

    const toggleCheckbox = (name: "enable" | "hide_personal_info" | "hide_invites" | "disable_sounds" | "disable_notifications") => {
        setCheckboxes({
            ...checkboxes,
            [name]: !checkboxes[name]
        })
    }

    return (<>
        <h2>Streamer Mode</h2>

        <CheckboxOption checked={checkboxes.enable} onClick={() => toggleCheckbox("enable")}
                        title="Enable Streamer Mode"
                        description="You can set a keybind to toggle Streamer Mode on Keybind Settings."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <span className="card-text-secondary">Options</span>

        <CheckboxOption checked={checkboxes.hide_personal_info} onClick={() => toggleCheckbox("hide_personal_info")}
                        title="Hide Personal Information"
                        description="Hides email, connected accounts,notes and anonymizes number tags."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <CheckboxOption checked={checkboxes.hide_invites} onClick={() => toggleCheckbox("hide_invites")}
                        title="Hide Invite Links"
                        description={`Recommended if you don't want random people accessing your ${INSTANCE_NAME} guilds.`}/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <CheckboxOption checked={checkboxes.disable_sounds} onClick={() => toggleCheckbox("disable_sounds")}
                        title="Disable Sounds"
                        description="All sound effects will be disabled."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <CheckboxOption checked={checkboxes.disable_notifications} onClick={() => toggleCheckbox("disable_notifications")}
                        title="Disable Notifications"
                        description="All desktop notifications will be disabled."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>
    </>);
}