import RadioOption from "../../../ui/RadioOption";
import CheckboxOption from "../../../ui/CheckboxOption";
import {Divider} from "@mui/material";
import useSettings from "../../../../hooks/use_settings";

export default function AppearanceTab() {
    const {settings, patchSettings} = useSettings();

    return (<>
        <h2>Appearance</h2>

        <span className="card-text-secondary">THEME</span>

        <RadioOption checked={settings.theme === "dark"} onClick={() => patchSettings({theme: "dark"})}
                     title="Dark"/>
        <RadioOption checked={settings.theme === "light"} onClick={() => patchSettings({theme: "light"})}
                     title="Light"/>
        <RadioOption checked={settings.theme === "sync"} onClick={() => patchSettings({theme: "sync"}, false)}
                     title="Sync with computer"/>

        <CheckboxOption checked={false} onClick={() => {}} title="Dark sidebar"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <RadioOption checked={!settings.message_display_compact} onClick={() => patchSettings({message_display_compact: false})}
                     title="Cozy: Modern, beautiful, and easy on your eyes."/>
        <RadioOption checked={settings.message_display_compact} onClick={() => patchSettings({message_display_compact: true})}
                     title="Compact: Fit mode messages on screen at one time. #IRC"/>

        <CheckboxOption checked={false} onClick={() => {}} title="Show avatars in Compact mode"/>
    </>);
}