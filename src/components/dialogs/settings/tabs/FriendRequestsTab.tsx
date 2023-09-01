import CheckboxOption from "../../../ui/CheckboxOption";
import {Divider} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {setSettings} from "../../../../states/app";

export default function FriendRequestsTab() {
    const settings = useSelector((state: RootState) => state.app.settings);
    const dispatch = useDispatch();

    return (<>
        <h2>Friend Requests</h2>

        <span className="card-text-secondary">WHO CAN SEND YOU A FRIEND REQUEST</span>

        <CheckboxOption checked={settings.friend_source_flags.all}
                        onClick={() => dispatch(setSettings({friend_source_flags: {...settings.friend_source_flags, all: !settings.friend_source_flags.all}}))}
                        title="Everyone"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <CheckboxOption checked={Boolean(settings.friend_source_flags.mutual_friends)}
                        onClick={() => dispatch(setSettings({friend_source_flags: {...settings.friend_source_flags, mutual_friends: !settings.friend_source_flags.mutual_friends}}))}
                        title="Friends of Friends"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <CheckboxOption checked={Boolean(settings.friend_source_flags.mutual_guilds)}
                        onClick={() => dispatch(setSettings({friend_source_flags: {...settings.friend_source_flags, mutual_guilds: !settings.friend_source_flags.mutual_guilds}}))}
                        title="Guild Members"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>
    </>);
}