import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Server} from "../types";

export interface ServersState {
    servers: {
        [key: string]: Server
    },
    selectedServer: Server | null,
}

export const serverState = createSlice({
    "name": "server",
    initialState: {
        servers: {},
        selectedServer: null,
    } as ServersState,
    reducers: {
        addServer: (state: ServersState, action: PayloadAction<Server>) => {
            const server: Server = action.payload;
            state.servers[server.id] = server;
        },
        removeServer: (state: ServersState, action: PayloadAction<string>) => {
            if (action.payload in state.servers)
                delete state.servers[action.payload];
        },
        addServers: (state: ServersState, action: PayloadAction<Server[]>) => {
            for (let server of action.payload as Server[]) {
                state.servers[server.id] = server;
            }
        }
    }
});

export const {addServer, addServers, removeServer} = serverState.actions;