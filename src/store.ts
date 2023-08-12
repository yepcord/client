import { configureStore } from '@reduxjs/toolkit'
import {serverState, ServersState} from "./states/servers";
import {channelState, ChannelsState} from "./states/channels";
import {appState, AppState} from "./states/app";

export interface RootState {
    server: ServersState,
    channel: ChannelsState,
    app: AppState,
}

export default configureStore({
    reducer: {
        server: serverState.reducer,
        channel: channelState.reducer,
        app: appState.reducer,
    },
})