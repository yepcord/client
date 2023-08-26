import store from "../../../../store";
import User, {RelationshipType} from "../../../../types/user";
import {addRelationship, addUser} from "../../../../states/users";

export interface RelationshipAddHandlerData {
    id: string,
    nickname: string | null,
    should_notify: boolean,
    type: RelationshipType,
    user: User,
}

export default function relationshipAddHandler(data: RelationshipAddHandlerData) {
    store.dispatch(addUser(data.user));
    store.dispatch(addRelationship({
        "id": data.id,
        "user_id": data.id,
        "type": data.type,
        "nickname": data.nickname,
    }))
}