import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import User from "../types/user";

type SelFriendsTab = "online" | "all" | "pending" | "blocked" | "add";

export interface AppState {
    token: string | null,
    me: User | null,
    selectedFriendsTab: SelFriendsTab,
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
        },
        selectedFriendsTab: "online",
    } as AppState,
    reducers: {
        setToken: (state: AppState, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        setCurrentUser: (state: AppState, action: PayloadAction<User>) => {
            state.me = action.payload;
        },
        setFriendsTab: (state: AppState, action: PayloadAction<SelFriendsTab>) => {
            state.selectedFriendsTab = action.payload;
        },
    }
});

export const {setToken, setCurrentUser, setFriendsTab} = appState.actions;