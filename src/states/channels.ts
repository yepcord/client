import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Channel from "../types/channel";

export interface ChannelsState {
    dmChannels: {
        [key: string]: Channel
    },
    selectedChannel: Channel | null,
}

export const channelState = createSlice({
    "name": "channel",
    initialState: {
        dmChannels: {},
        selectedChannel: null,
    } as ChannelsState,
    reducers: {
        addChannel: (state: ChannelsState, action: PayloadAction<Channel>) => {
            const channel: Channel = action.payload;
            if(!channel.recipients && channel.id in state.dmChannels) channel.recipients = state.dmChannels[channel.id].recipients;
            channel.id in state.dmChannels ? Object.assign(state.dmChannels[channel.id], channel) : state.dmChannels[channel.id] = channel;
        },
        removeChannel: (state: ChannelsState, action: PayloadAction<string>) => {
            if (action.payload in state.dmChannels)
                delete state.dmChannels[action.payload];
        },
        addChannels: (state: ChannelsState, action: PayloadAction<Channel[]>) => {
            for (let channel of action.payload as Channel[]) {
                channel.id in state.dmChannels ? Object.assign(state.dmChannels[channel.id], channel) : state.dmChannels[channel.id] = channel;
            }
        },
        setSelectedChannel: (state: ChannelsState, action: PayloadAction<Channel | null>) => {
            state.selectedChannel = action.payload;
        },
        updateSelectedChannel: (state: ChannelsState, action: PayloadAction<Channel>) => {
            state.selectedChannel && Object.assign(state.selectedChannel, action.payload);
        },
    }
});

export const {addChannel, removeChannel, addChannels, setSelectedChannel, updateSelectedChannel} = channelState.actions;