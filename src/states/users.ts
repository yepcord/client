import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import User, {Presence} from "../types/user";

export interface UsersState {
    users: {
        [key:string]: User
    },
    friends: {
        [key:string]: User
    },
    presences: {
        [key:string]: Presence
    },
}

export const usersState = createSlice({
    "name": "app",
    initialState: {
        users: {},
        friends: {},
        presences: {},
    } as UsersState,
    reducers: {
        addUser: (state: UsersState, action: PayloadAction<User>) => {
            const user = action.payload;
            state.users[user.id] = user;
        },
        addFriend: (state: UsersState, action: PayloadAction<User>) => {
            const user = action.payload;
            state.friends[user.id] = user;
        },
        removeFriend: (state: UsersState, action: PayloadAction<string>) => {
            delete state.friends[action.payload];
        },
    }
});

export const {addUser} = usersState.actions;