import CheckboxOption from "../../../ui/CheckboxOption";
import {Divider} from "@mui/material";
import useSettings from "../../../../hooks/use_settings";

export default function FriendRequestsTab() {
    const {settings, patchSettings} = useSettings();

    return (<>
        <h2>Friend Requests</h2>

        <span className="card-text-secondary">WHO CAN SEND YOU A FRIEND REQUEST</span>

        <CheckboxOption checked={settings.friend_source_flags.all}
                        onClick={() => patchSettings({friend_source_flags: {...settings.friend_source_flags, all: !settings.friend_source_flags.all}})}
                        title="Everyone"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <CheckboxOption checked={Boolean(settings.friend_source_flags.mutual_friends)}
                        onClick={() => patchSettings({friend_source_flags: {...settings.friend_source_flags, mutual_friends: !settings.friend_source_flags.mutual_friends}})}
                        title="Friends of Friends"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <CheckboxOption checked={Boolean(settings.friend_source_flags.mutual_guilds)}
                        onClick={() => patchSettings({friend_source_flags: {...settings.friend_source_flags, mutual_guilds: !settings.friend_source_flags.mutual_guilds}})}
                        title="Guild Members"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>
    </>);
}