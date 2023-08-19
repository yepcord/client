import {Presence, Relationship, RelationshipType} from "../../../types/user";
import {SelFriendsTab} from "../../../states/app";

export function getRelationshipsByTab(relationships: { [key: string]: Relationship }, tab: SelFriendsTab, presences: { [key: string]: Presence }) {
    let types = [RelationshipType.FRIEND];
    if (tab === "pending")
        types = [RelationshipType.REQUEST_RECEIVED, RelationshipType.REQUEST_SENT];
    else if (tab === "blocked")
        types = [RelationshipType.BLOCK];

    let res: Relationship[] = [];
    for (let rel of Object.values(relationships) as Relationship[]) {
        if (types.includes(rel.type) && (tab !== "online" || (tab === "online" && presences[rel.id]?.status !== "offline")))
            types.indexOf(rel.type) === 0 ? res.splice(0, 0, rel) : res.push(rel);
    }

    return res;
}