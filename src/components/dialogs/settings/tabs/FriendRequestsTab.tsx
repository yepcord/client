import CheckboxOption from "../../../ui/CheckboxOption";
import {Divider} from "@mui/material";
import {useState} from "react";

export default function FriendRequestsTab() {
    const [checkboxes, setCheckboxes] = useState({
        everyone: false,
        friends_of_friends: false,
        guild_members: false,
    });

    const toggleCheckbox = (name: "everyone" | "friends_of_friends" | "guild_members") => {
        setCheckboxes({
            ...checkboxes,
            [name]: !checkboxes[name]
        })
    }

    return (<>
        <h2>Friend Requests</h2>

        <span className="card-text-secondary">WHO CAN SEND YOU A FRIEND REQUEST</span>

        <CheckboxOption checked={checkboxes.everyone} onClick={() => toggleCheckbox("everyone")} title="Everyone"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <CheckboxOption checked={checkboxes.friends_of_friends} onClick={() => toggleCheckbox("friends_of_friends")}
                        title="Friends of Friends"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <CheckboxOption checked={checkboxes.guild_members} onClick={() => toggleCheckbox("guild_members")}
                        title="Guild Members"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

    </>);
}