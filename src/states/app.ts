import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserMe} from "../types/user";

export type SelFriendsTab = "online" | "all" | "pending" | "blocked" | "add";

export interface AppState {
    token: string | null,
    me: UserMe | null,
    selectedFriendsTab: SelFriendsTab,
    websocketReady: boolean,
}

export const appState = createSlice({
    "name": "app",
    initialState: {
        token: localStorage.getItem("token"),
        me: {
            id: "0",
            email: "",
            username: "unknown",
            discriminator: "0000",
            avatar: null,
            banner: null,
            bio: "",
            bot: false,
        },
        selectedFriendsTab: "online",
        websocketReady: false,
    } as AppState,
    reducers: {
        setToken: (state: AppState, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        setCurrentUser: (state: AppState, action: PayloadAction<UserMe>) => {
            state.me = action.payload;
        },
        setFriendsTab: (state: AppState, action: PayloadAction<SelFriendsTab>) => {
            state.selectedFriendsTab = action.payload;
        },
        setWsReady: (state: AppState, action: PayloadAction<boolean>) => {
            state.websocketReady = action.payload;
        },
    }
});

export const {setToken, setCurrentUser, setFriendsTab, setWsReady} = appState.actions;