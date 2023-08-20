import User, {Presence} from "../../../../types/user";
import store from "../../../../store";
import {addPresence, addUser} from "../../../../states/users";

export interface PresenceUpdateHandlerData extends Presence {
    user?: User,
}

export default function presenceUpdateHandler(data: PresenceUpdateHandlerData) {
    store.dispatch(addUser(data.user!));
    data.user_id = data.user!.id;
    delete data.user;
    store.dispatch(addPresence(data));
}