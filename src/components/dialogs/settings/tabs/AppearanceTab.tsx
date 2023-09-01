import RadioOption from "../../../ui/RadioOption";
import CheckboxOption from "../../../ui/CheckboxOption";
import {Divider} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {setSettings} from "../../../../states/app";

export default function AppearanceTab() {
    const settings = useSelector((state: RootState) => state.app.settings);
    const dispatch = useDispatch();

    return (<>
        <h2>Appearance</h2>

        <span className="card-text-secondary">THEME</span>

        <RadioOption checked={settings.theme === "dark"} onClick={() => dispatch(setSettings({theme: "dark"}))}
                     title="Dark"/>
        <RadioOption checked={settings.theme === "light"} onClick={() => dispatch(setSettings({theme: "light"}))}
                     title="Light"/>
        <RadioOption checked={settings.theme === "sync"} onClick={() => dispatch(setSettings({theme: "sync"}))}
                     title="Sync with computer"/>

        <CheckboxOption checked={false} onClick={() => {
        }} title="Dark sidebar"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <RadioOption checked={!settings.message_display_compact} onClick={() => dispatch(setSettings({message_display_compact: false}))}
                     title="Cozy: Modern, beautiful, and easy on your eyes."/>
        <RadioOption checked={settings.message_display_compact} onClick={() => dispatch(setSettings({message_display_compact: true}))}
                     title="Compact: Fit mode messages on screen at one time. #IRC"/>

        <CheckboxOption checked={false} onClick={() => {}} title="Show avatars in Compact mode"/>
    </>);
}