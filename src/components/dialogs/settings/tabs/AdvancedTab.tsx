import CheckboxOption from "../../../ui/CheckboxOption";
import {Divider} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {setSettings} from "../../../../states/app";

export default function AdvancedTab() {
    const settings = useSelector((state: RootState) => state.app.settings);
    const dispatch = useDispatch();

    return (<>
        <h2>Advanced</h2>

        <CheckboxOption checked={settings.developer_mode} onClick={() => dispatch(setSettings({developer_mode: !settings.developer_mode}))}
                        title="Developer Mode"
                        description="Developer Mode exposes context menu items helpful for people writing bots using the API."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>
    </>);
}