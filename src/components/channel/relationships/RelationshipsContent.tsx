import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {useState} from "react";
import {Divider} from "@mui/material";
import {getRelationshipsByTab} from "./utils";
import RelationshipList from "./RelationshipList";

function RelationshipsListContent() {
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
    );
}

function RelationshipsAddContent() {
    const [text, setText] = useState("");
    const btn_enabled = text.split("#").length === 2 && text.split("#")[0].length > 1  && text.split("#")[1].length === 4;

    return (
        <div className="channel-content">
            <div className="add-friend-form">
                <h4 className="add-friend-header">ADD FRIEND</h4>
                <span className="card-text-secondary">You can add a friend with their Tag. It's CaSe SeNsItIvE!</span>
                <div className="add-friend-input">
                    <input className="input-primary" placeholder="Enter a Username#1234" value={text} onChange={(e) => setText(e.currentTarget.value)}/>
                    <button className="btn-primary" disabled={!btn_enabled}>Send Friend Request</button>
                </div>
            </div>
        </div>
    );
}

export default function RelationshipsContent() {
    const tab = useSelector((state: RootState) => state.app.selectedFriendsTab);

    return tab === "add" ? <RelationshipsAddContent/> : <RelationshipsListContent/>;
}