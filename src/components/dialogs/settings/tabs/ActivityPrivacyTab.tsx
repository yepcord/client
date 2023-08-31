import CheckboxOption from "../../../ui/CheckboxOption";
import {Divider} from "@mui/material";
import {useState} from "react";
import {INSTANCE_NAME} from "../../../../constants";

export default function ActivityPrivacyTab() {
    const [checkboxes, setCheckboxes] = useState({
        activity_as_status: false,
        share_activity: false,
        allow_friends_join: false,
        allow_voice_join: false,
    });

    const toggleCheckbox = (name: "activity_as_status" | "share_activity" | "allow_friends_join" | "allow_voice_join") => {
        setCheckboxes({
            ...checkboxes,
            [name]: !checkboxes[name]
        })
    }

    return (<>
        <h2>Activity Privacy</h2>

        <span className="card-text-secondary">ACTIVITY STATUS</span>

        <CheckboxOption checked={checkboxes.activity_as_status} onClick={() => toggleCheckbox("activity_as_status")}
                        title="Display current activity as a status message"
                        description={`${INSTANCE_NAME} will automatically update your status if you're attending a public Stage.`}/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <CheckboxOption checked={checkboxes.share_activity} onClick={() => toggleCheckbox("share_activity")}
                        title="Share your activity status by default when joining large guilds"
                        description="This setting allows you to control how you share your activity status by default
                        when you join a new guild with ober 200 members."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <span className="card-text-secondary">RICH PRESENCE</span>

        <CheckboxOption checked={checkboxes.allow_friends_join} onClick={() => toggleCheckbox("allow_friends_join")}
                        title="Allow friends to join your game"
                        description="This setting allows friends to join your game without sending a request."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <CheckboxOption checked={checkboxes.allow_voice_join} onClick={() => toggleCheckbox("allow_voice_join")}
                        title="Allow voice channel participants to join your game"
                        description="This setting allows people that are in the same voice channel as you to join your
                        game without sending a request. This feature only works in non-community guilds"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>
    </>);
}