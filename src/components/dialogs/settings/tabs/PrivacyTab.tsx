import {useState} from "react";
import {Divider} from "@mui/material";
import {INSTANCE_NAME} from "../../../../constants";
import CheckboxOption from "../../../ui/CheckboxOption";
import RadioOption from "../../../ui/RadioOption";
import ToDo from "../../../ui/ToDo";

type ScanMessages = "keep_me_safe" | "friends_are_nice" | "do_not_scan";

export default function PrivacyTab() {
    const [scanMessages, setScanMessages] = useState("keep_me_safe" as ScanMessages);
    const [checkboxes, setCheckboxes] = useState({
        dms_from_guilds: false,
        nsfw_ios: false,
        nsfw_commands: false,
        analytics: false,
        personalization: false
    });

    const toggleCheckbox = (name: "dms_from_guilds" | "nsfw_ios" | "nsfw_commands" | "analytics" | "personalization") => {
        setCheckboxes({
            ...checkboxes,
            [name]: !checkboxes[name]
        })
    }

    return (<>
        <h2>Privacy & Safety</h2>

        <span className="card-text-secondary">SAFE DIRECT MESSAGING</span>
        <span className="card-text-secondary font-13">Automatically scan and delete direct messages you receive that contain explicit media content.</span>

        <RadioOption checked={scanMessages === "keep_me_safe"} onClick={() => setScanMessages("keep_me_safe")}
                     title="Keep me safe" description="Scan direct messages from everyone." color="green"/>

        <RadioOption checked={scanMessages === "friends_are_nice"} onClick={() => setScanMessages("friends_are_nice")}
                     title="My friends are nice" description="Scan direct messages from everyone unless they are a friend." color="orange"/>

        <RadioOption checked={scanMessages === "do_not_scan"} onClick={() => setScanMessages("do_not_scan")}
                     title="Do not scan" description="Direct messages will not be scanned for explicit content." color="red"/>

        <span className="card-text-secondary">GUILD PRIVACY DEFAULTS</span>

        <CheckboxOption checked={checkboxes.dms_from_guilds} onClick={() => toggleCheckbox("dms_from_guilds")}
                        title="Allow direct messages from guild members"
                        description="This setting is applied when you join a new server."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <CheckboxOption checked={checkboxes.nsfw_ios} onClick={() => toggleCheckbox("nsfw_ios")}
                        title="Allow to age-restricted guilds on iOS"
                        description="After joining on desktop, view your guilds for people 18+ on iOS devices."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <CheckboxOption checked={checkboxes.nsfw_commands} onClick={() => toggleCheckbox("nsfw_commands")}
                        title="Allow access to age-restricted commands from apps in DMs"
                        description="This setting applies to all bots and apps. Allows people 18+ to access commands marked as age-restricted in DMs."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <span className="card-text-secondary">HOW WE USE YOUR DATA</span>

        <CheckboxOption checked={checkboxes.analytics} onClick={() => toggleCheckbox("analytics")}
                        title={`Use data to improve ${INSTANCE_NAME}`}
                        description={`This setting allow us to use and process information about how you navigate 
                        and use ${INSTANCE_NAME} for analytical purposes.`}/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <CheckboxOption checked={checkboxes.personalization} onClick={() => toggleCheckbox("personalization")}
                        title={`Use data to customize my ${INSTANCE_NAME} experience`}
                        description={`This setting allow us to use information, such as who you talk to and what 
                        games you play, to customize ${INSTANCE_NAME} for you.`}/>

        <ToDo text='Add "Request all of my Data" section'/>
    </>);
}