import {useState} from "react";
import CheckboxOption from "../../../ui/CheckboxOption";
import {Divider} from "@mui/material";
import {INSTANCE_NAME} from "../../../../constants";

export default function AdvancedTab() {
    const [checkboxes, setCheckboxes] = useState({
        dev_mode: false,
    });

    const toggleCheckbox = (name: "dev_mode") => {
        setCheckboxes({
            ...checkboxes,
            [name]: !checkboxes[name]
        })
    }

    return (<>
        <h2>Advanced</h2>

        <CheckboxOption checked={checkboxes.dev_mode} onClick={() => toggleCheckbox("dev_mode")}
                        title="Developer Mode"
                        description="Developer Mode exposes context menu items helpful for people writing bots using the API."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>
    </>);
}