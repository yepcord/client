import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import User, {Presence, Relationship} from "../types/user";

export interface UsersState {
    users: {
        [key:string]: User
    },
    relationships: {
        [key:string]: Relationship
    },
    presences: {
        [key:string]: Presence
    },
}

export const usersState = createSlice({
    "name": "app",
    initialState: {
        users: {},
        relationships: {},
        presences: {},
    } as UsersState,
    reducers: {
        addUser: (state: UsersState, action: PayloadAction<User>) => {
            const user = action.payload;
            user.id in state.users ? Object.assign(state.users[user.id], user) : state.users[user.id] = user;
        },
        addUsers: (state: UsersState, action: PayloadAction<User[]>) => {
            for(let user of action.payload) {
                user.id in state.users ? Object.assign(state.users[user.id], user) : state.users[user.id] = user;
            }
        },
        addRelationship: (state: UsersState, action: PayloadAction<Relationship>) => {
            const rel = action.payload;
            rel.id in state.relationships ? Object.assign(state.relationships[rel.id], rel) : state.relationships[rel.id] = rel;
        },
        addRelationships: (state: UsersState, action: PayloadAction<Relationship[]>) => {
            for(let rel of action.payload) {
                rel.id in state.relationships ? Object.assign(state.relationships[rel.id], rel) : state.relationships[rel.id] = rel;
            }
        },
        removeRelationship: (state: UsersState, action: PayloadAction<string>) => {
            delete state.relationships[action.payload];
        },
        addPresence: (state: UsersState, action: PayloadAction<Presence>) => {
            const presence = action.payload;
            presence.user_id in state.presences ? Object.assign(state.presences[presence.user_id], presence) : state.presences[presence.user_id] = presence;
        },
        addPresences: (state: UsersState, action: PayloadAction<Presence[]>) => {
            for(let presence of action.payload) {
                presence.user_id in state.presences ? Object.assign(state.presences[presence.user_id], presence) : state.presences[presence.user_id] = presence;
            }
        },
    }
});

export const {addUser, addUsers, addRelationship, addRelationships, removeRelationship, addPresence, addPresences} = usersState.actions;