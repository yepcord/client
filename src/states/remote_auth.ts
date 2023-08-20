import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface RemoteAuthUserdata {
    id: string,
    username: string,
    discriminator: string,
    avatar: string | null,
}

export interface RemoteAuthState {
    fingerprint: string | null,
    userdata: RemoteAuthUserdata | null,
}

export const remoteauthState = createSlice({
    "name": "remote_auth",
    initialState: {
        fingerprint: null,
        userdata: null,
    } as RemoteAuthState,
    reducers: {
        setFingerprint: (state: RemoteAuthState, action: PayloadAction<string|null>) => {
            state.fingerprint = action.payload;
        },
        setUserdata: (state: RemoteAuthState, action: PayloadAction<RemoteAuthUserdata|null>) => {
            state.userdata = action.payload;
        },
    }
});

export const {setFingerprint, setUserdata} = remoteauthState.actions;