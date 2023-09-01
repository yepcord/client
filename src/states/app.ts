import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PartialUserSettings, UserMe, UserSettings} from "../types/user";

export type SelFriendsTab = "online" | "all" | "pending" | "blocked" | "add";

export interface AppState {
    token: string | null,
    me: UserMe | null,
    settings: UserSettings,
    selectedFriendsTab: SelFriendsTab,
    websocketReady: boolean,
    settingsDialogOpen: boolean,
    profileDialogUserId: string | null,
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
        profileDialogUserId: null,
    } as AppState,
    reducers: {
        setToken: (state: AppState, action: PayloadAction<string|null>) => {
            state.token = action.payload;
            action.payload ? localStorage.setItem("token", action.payload) : localStorage.removeItem("token");
        },
        setCurrentUser: (state: AppState, action: PayloadAction<UserMe>) => {
            state.me ? Object.assign(state.me, action.payload) : state.me = action.payload;
        },
        setFriendsTab: (state: AppState, action: PayloadAction<SelFriendsTab>) => {
            state.selectedFriendsTab = action.payload;
        },
        setWsReady: (state: AppState, action: PayloadAction<boolean>) => {
            state.websocketReady = action.payload;
        },
        setSettings: (state: AppState, action: PayloadAction<PartialUserSettings>) => {
            Object.assign(state.settings, action.payload);
        },
        openSettings: (state: AppState) => {
            state.settingsDialogOpen = true;
        },
        closeSettings: (state: AppState) => {
            state.settingsDialogOpen = false;
        },
        setUserProfileDialog: (state: AppState, action: PayloadAction<string | null>) => {
            state.profileDialogUserId = action.payload;
        },
    }
});

export const {setToken, setCurrentUser, setFriendsTab, setWsReady, setSettings, openSettings, closeSettings, setUserProfileDialog} = appState.actions;