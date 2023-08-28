import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {useState} from "react";
import {Divider} from "@mui/material";
import {getRelationshipsByTab} from "./utils";
import RelationshipList from "./RelationshipList";
import ApiClient, {ErrorResponse} from "../../../api/client";
import PrimaryButton from "../../ui/PrimaryButton";

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
                        <RelationshipList filter={searchText}/>
                    </>)
                    : <div className="centered">Nothing there</div>
                }
            </div>

        </div>
    );
}

function parseUsername(username: string) {
    if(username.length < 6) return null;
    if(username.substring(username.length-5, username.length-4) !== "#") return null;
    const name = username.substring(0, username.length-5);
    const disc = username.substring(username.length-4);
    if(!name) return null;
    if(isNaN(Number(disc)) || Number(disc) < 1 || Number(disc) > 9999) return null;
    return [name, disc];
}

function RelationshipsAddContent() {
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const btn_enabled = parseUsername(text) !== null;

    const sendRelReq = () => {
        const u = parseUsername(text);
        if(u === null) return;
        ApiClient.requestRelationship(u[0], u[1]).then(resp => {
            if(resp.status >= 400 && resp.status <= 499)
                setError((resp.body as ErrorResponse).message);
            if(resp.status >= 500)
                setError("Unknown server error! Try again later.");
        }); // TODO: check error
    }

    return (
        <div className="channel-content">
            <div className="add-friend-form">
                <h4 className="add-friend-header">ADD FRIEND</h4>
                <span className="card-text-secondary">You can add a friend with their Tag. It's CaSe SeNsItIvE!</span>
                <div className="add-friend-input">
                    <input className="input-primary" placeholder="Enter a Username#1234" value={text} onChange={(e) => setText(e.currentTarget.value)}/>
                    <PrimaryButton disabled={!btn_enabled} onClick={sendRelReq}>Send Friend Request</PrimaryButton>
                </div>
                {error && <span className="card-text-secondary" style={{color: "red"}}>{error}</span>}
            </div>
        </div>
    );
}

export default function RelationshipsContent() {
    const tab = useSelector((state: RootState) => state.app.selectedFriendsTab);

    return tab === "add" ? <RelationshipsAddContent/> : <RelationshipsListContent/>;
}