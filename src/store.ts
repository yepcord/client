import { configureStore } from '@reduxjs/toolkit'
import {guildState, GuildsState} from "./states/guilds";
import {channelState, ChannelsState} from "./states/channels";
import {appState, AppState} from "./states/app";
import {usersState, UsersState} from "./states/users";

export interface RootState {
    guild: GuildsState,
    channel: ChannelsState,
    app: AppState,
    users: UsersState
}

export default configureStore({
    reducer: {
        guild: guildState.reducer,
        channel: channelState.reducer,
        app: appState.reducer,
        users: usersState.reducer,
    },
})