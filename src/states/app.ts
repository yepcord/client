import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import User from "../types/user";

export interface AppState {
    token: string | null,
    me: User | null,
}

export const appState = createSlice({
    "name": "app",
    initialState: {
        token: localStorage.getItem("token"),
        me: {
            id: "0",
            username: "unknown",
            discriminator: "0000",
            avatar: null,
            banner: null,
            bio: null,
            bot: false,
        }
    } as AppState,
    reducers: {
        setToken: (state: AppState, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        setCurrentUser: (state: AppState, action: PayloadAction<User>) => {
            state.me = action.payload;
        },
    }
});

export const {setToken, setCurrentUser} = appState.actions;