import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Server} from "../types";

export interface ServerState {
    servers: {
        [key: string]: Server
    },
    selectedServer: Server | null,
}

export const serverSlice = createSlice({
    "name": "server",
    initialState: {
        servers: {},
        selectedServer: null,
    } as ServerState,
    reducers: {
        addServer: (state, action: PayloadAction<Server>) => {
            const server: Server = action.payload;
            state.servers[server.id] = server;
        },
        removeServer: (state, action: PayloadAction<string>) => {
            if (action.payload in state.servers)
                delete state.servers[action.payload];
        },
        addServers: (state: ServerState, action: PayloadAction<Server[]>) => {
            for (let server of action.payload as Server[]) {
                state.servers[server.id] = server;
            }
        }
    }
});

export const {addServer, addServers, removeServer} = serverSlice.actions;