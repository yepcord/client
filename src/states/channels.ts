import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Channel} from "../types";

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
            state.dmChannels[channel.id] = channel;
        },
        removeChannel: (state: ChannelsState, action: PayloadAction<string>) => {
            if (action.payload in state.dmChannels)
                delete state.dmChannels[action.payload];
        },
        addChannels: (state: ChannelsState, action: PayloadAction<Channel[]>) => {
            for (let channel of action.payload as Channel[]) {
                state.dmChannels[channel.id] = channel;
            }
        }
    }
});

export const {addChannel, removeChannel, addChannels} = channelState.actions;