import {configureStore} from '@reduxjs/toolkit'
import {GuildsState, guildState} from "./states/guilds";
import {ChannelsState, channelState} from "./states/channels";
import {appState, AppState} from "./states/app";
import {usersState, UsersState} from "./states/users";
import {MessagesState, messageState} from "./states/messages";

export interface RootState {
    guild: GuildsState,
    channel: ChannelsState,
    app: AppState,
    users: UsersState,
    messages: MessagesState,
}

export default configureStore({
    reducer: {
        guild: guildState.reducer,
        channel: channelState.reducer,
        app: appState.reducer,
        users: usersState.reducer,
        messages: messageState.reducer,
    },
})