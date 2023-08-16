import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserMe, UserSettings} from "../types/user";

export type SelFriendsTab = "online" | "all" | "pending" | "blocked" | "add";

export interface AppState {
    token: string | null,
    me: UserMe | null,
    settings: UserSettings,
    selectedFriendsTab: SelFriendsTab,
    websocketReady: boolean,
    settingsDialogOpen: boolean,
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
        settings: {},
        selectedFriendsTab: "online",
        websocketReady: false,
        settingsDialogOpen: false,
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
        setSettings: (state: AppState, action: PayloadAction<UserSettings>) => {
            Object.assign(state.settings, action.payload);
        },
        openSettings: (state: AppState) => {
            state.settingsDialogOpen = true;
        },
        closeSettings: (state: AppState) => {
            state.settingsDialogOpen = false;
        },
    }
});

export const {setToken, setCurrentUser, setFriendsTab, setWsReady, setSettings, openSettings, closeSettings} = appState.actions;