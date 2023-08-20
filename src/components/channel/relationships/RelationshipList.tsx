import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {getRelationshipsByTab} from "./utils";
import FriendItem from "./relationship_types/FriendItem";
import PendingRequestItem from "./relationship_types/PendingRequestItem";
import BlockedItem from "./relationship_types/BlockedItem";

export default function RelationshipList() {
    const relationshipsState = useSelector((state: RootState) => state.users.relationships);
    const users = useSelector((state: RootState) => state.users.users);
    const presences = useSelector((state: RootState) => state.users.presences);
    const tab = useSelector((state: RootState) => state.app.selectedFriendsTab);

    let relationships = getRelationshipsByTab(relationshipsState, tab, presences);

    let relationship_items;
    if (tab === "pending") {
        relationship_items = relationships.map((rel) => {
            let user = users[rel.id];
            return <PendingRequestItem user={user} type={rel.type}/>
        });
    } else if (tab === "blocked") {
        relationship_items = relationships.map((rel) => {
            let user = users[rel.id];
            return <BlockedItem user={user}/>
        });
    } else {
        relationship_items = relationships.map((rel) => {
            let user = users[rel.id];
            let status: string = presences[rel.id] ? presences[rel.id].status : "offline";
            status = status === "dnd" ? "Do Not Disturb" : status.charAt(0).toUpperCase() + status.slice(1);
            return <FriendItem user={user} status={status}/>
        });
    }

    return (
        <div className="friends-list">
            {relationship_items}
        </div>
    );
}