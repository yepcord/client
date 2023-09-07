import {Divider} from "@mui/material";
import {INSTANCE_NAME} from "../../../../constants";
import CheckboxOption from "../../../ui/CheckboxOption";
import RadioOption from "../../../ui/RadioOption";
import ToDo from "../../../ui/ToDo";
import useSettings from "../../../../hooks/use_settings";

export default function PrivacyTab() {
    const {settings, patchSettings, toggleSettings} = useSettings();

    return (<>
        <h2>Privacy & Safety</h2>

        <span className="card-text-secondary">SAFE DIRECT MESSAGING</span>
        <span className="card-text-secondary font-13">Automatically scan and delete direct messages you receive that contain explicit media content.</span>

        <RadioOption checked={settings.explicit_content_filter === 2}
                     onClick={() => patchSettings({explicit_content_filter: 2})}
                     title="Keep me safe" description="Scan direct messages from everyone." color="green"/>

        <RadioOption checked={settings.explicit_content_filter === 1}
                     onClick={() => patchSettings({explicit_content_filter: 1})}
                     title="My friends are nice"
                     description="Scan direct messages from everyone unless they are a friend." color="orange"/>

        <RadioOption checked={settings.explicit_content_filter === 0}
                     onClick={() => patchSettings({explicit_content_filter: 0})}
                     title="Do not scan" description="Direct messages will not be scanned for explicit content."
                     color="red"/>

        <span className="card-text-secondary">GUILD PRIVACY DEFAULTS</span>

        <CheckboxOption checked={false} onClick={() => {}}
                        title="Allow direct messages from guild members"
                        description="This setting is applied when you join a new server."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <CheckboxOption checked={settings.view_nsfw_guilds}
                        onClick={() => toggleSettings("view_nsfw_guilds")}
                        title="Allow to age-restricted guilds on iOS"
                        description="After joining on desktop, view your guilds for people 18+ on iOS devices."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <CheckboxOption checked={settings.view_nsfw_commands}
                        onClick={() => toggleSettings("view_nsfw_commands")}
                        title="Allow access to age-restricted commands from apps in DMs"
                        description="This setting applies to all bots and apps. Allows people 18+ to access commands marked as age-restricted in DMs."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <span className="card-text-secondary">HOW WE USE YOUR DATA</span>

        <ToDo text='Add personalization/analytics settings'/>
        <CheckboxOption checked={false} onClick={() => {}}
                        title={`Use data to improve ${INSTANCE_NAME}`}
                        description={`This setting allow us to use and process information about how you navigate 
                        and use ${INSTANCE_NAME} for analytical purposes.`}/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <CheckboxOption checked={false} onClick={() => {}}
                        title={`Use data to customize my ${INSTANCE_NAME} experience`}
                        description={`This setting allow us to use information, such as who you talk to and what 
                        games you play, to customize ${INSTANCE_NAME} for you.`}/>

        <ToDo text='Add "Request all of my Data" section'/>
    </>);
}