import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface AppState {
    token: string | null,
}

export const appState = createSlice({
    "name": "app",
    initialState: {
        token: null,
    } as AppState,
    reducers: {
        setToken: (state: AppState, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    }
});

export const {setToken} = appState.actions;