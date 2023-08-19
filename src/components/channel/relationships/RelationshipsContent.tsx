import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {useState} from "react";
import {Divider} from "@mui/material";
import {getRelationshipsByTab} from "./utils";
import RelationshipList from "./RelationshipList";

export default function RelationshipsContent() {
    const relationships = useSelector((state: RootState) => state.users.relationships);
    const presences = useSelector((state: RootState) => state.users.presences);
    const tab = useSelector((state: RootState) => state.app.selectedFriendsTab);
    const [searchText, setSearchText] = useState("");

    let text;
    if (tab === "online")
        text = "ONLINE FRIENDS";
    else if (tab === "all")
        text = "ALL FRIENDS";
    else if (tab === "pending")
        text = "PENDING FRIEND REQUESTS";
    else if (tab === "blocked")
        text = "BLOCKED USERS";

    let rel_count = getRelationshipsByTab(relationships, tab, presences).length;

    return (
        <div className="channel-content">
            <div className="friends-list-container">
                {rel_count > 0
                    ? (<>
                        <input type="text" className="input-primary w-100" placeholder="Search..."
                               onChange={e => setSearchText(e.target.value)}/>
                        <p>{text} - {rel_count}</p>
                        <Divider flexItem sx={{backgroundColor: "#757575"}}/>
                        <RelationshipList/>
                    </>)
                    : <div className="centered">Nothing there</div>
                }
            </div>

        </div>
    )
}