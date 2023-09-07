import CheckboxOption from "../../../ui/CheckboxOption";
import {Divider} from "@mui/material";
import useSettings from "../../../../hooks/use_settings";

export default function AdvancedTab() {
    const {settings, toggleSettings} = useSettings();

    return (<>
        <h2>Advanced</h2>

        <CheckboxOption checked={settings.developer_mode} onClick={() => toggleSettings("developer_mode")}
                        title="Developer Mode"
                        description="Developer Mode exposes context menu items helpful for people writing bots using the API."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>
    </>);
}