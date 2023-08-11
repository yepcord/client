import { configureStore } from '@reduxjs/toolkit'
import {serverSlice, ServerState} from "./reducers/serverSlice";
import {channelSlice, ChannelState} from "./reducers/channelSlice";

export interface RootState {
    server: ServerState,
    channel: ChannelState,
}

export default configureStore({
    reducer: {
        server: serverSlice.reducer,
        channel: channelSlice.reducer,
    },
})