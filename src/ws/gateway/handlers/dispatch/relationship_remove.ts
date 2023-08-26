import store from "../../../../store";
import {RelationshipType} from "../../../../types/user";
import {removeRelationship} from "../../../../states/users";

export interface RelationshipRemoveHandlerData {
    id: string,
    type?: RelationshipType,
}

export default function relationshipRemoveHandler(data: RelationshipRemoveHandlerData) {
    store.dispatch(removeRelationship(data.id))
}