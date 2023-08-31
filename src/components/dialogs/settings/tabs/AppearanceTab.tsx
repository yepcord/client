import {useState} from "react";
import RadioOption from "../../../ui/RadioOption";
import CheckboxOption from "../../../ui/CheckboxOption";
import {Divider} from "@mui/material";

export default function AppearanceTab() {
    const [theme, setTheme] = useState("dark" as ("dark" | "light" | "sync"));
    const [mDisplay, setMDisplay] = useState("cozy" as ("cozy" | "compact"));

    return (<>
        <h2>Appearance</h2>

        <span className="card-text-secondary">THEME</span>

        <RadioOption checked={theme === "dark"} onClick={() => setTheme("dark")} title="Dark"/>
        <RadioOption checked={theme === "light"} onClick={() => setTheme("light")} title="Light"/>
        <RadioOption checked={theme === "sync"} onClick={() => setTheme("sync")} title="Sync with computer"/>

        <CheckboxOption checked={false} onClick={() => {
        }} title="Dark sidebar"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <RadioOption checked={mDisplay === "cozy"} onClick={() => setMDisplay("cozy")} title="Cozy: Modern, beautiful, and easy on your eyes."/>
        <RadioOption checked={mDisplay === "compact"} onClick={() => setMDisplay("compact")} title="Compact: Fit mode messages on screen at one time. #IRC"/>

        <CheckboxOption checked={false} onClick={() => {}} title="Show avatars in Compact mode"/>
    </>);
}