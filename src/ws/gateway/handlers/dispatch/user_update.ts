import store from "../../../../store";
import User, {UserMe} from "../../../../types/user";
import {addUser} from "../../../../states/users";
import {setCurrentUser} from "../../../../states/app";

export type UserUpdateHandlerData = User | UserMe;

export default function userUpdateHandler(data: UserUpdateHandlerData) {
    const me = store.getState().app.me!;
    store.dispatch(addUser(data));
    if (data.id === me.id)
        store.dispatch(setCurrentUser(data as UserMe));
}