import { configureStore } from '@reduxjs/toolkit'
import {guildState, GuildsState} from "./states/guilds";
import {channelState, ChannelsState} from "./states/channels";
import {appState, AppState} from "./states/app";
import {usersState, UsersState} from "./states/users";
import {remoteauthState, RemoteAuthState} from "./states/remote_auth";

export interface RootState {
    guild: GuildsState,
    channel: ChannelsState,
    app: AppState,
    users: UsersState,
    remote_auth: RemoteAuthState,
}

export default configureStore({
    reducer: {
        guild: guildState.reducer,
        channel: channelState.reducer,
        app: appState.reducer,
        users: usersState.reducer,
        remote_auth: remoteauthState.reducer,
    },
})