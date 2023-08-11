import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Channel} from "../types";

export interface ChannelState {
    dmChannels: {
        [key: string]: Channel
    },
    selectedChannel: Channel | null,
}

export const channelSlice = createSlice({
    "name": "channel",
    initialState: {
        dmChannels: {},
        selectedChannel: null,
    } as ChannelState,
    reducers: {
        addChannel: (state, action: PayloadAction<Channel>) => {
            const channel: Channel = action.payload;
            state.dmChannels[channel.id] = channel;
        },
        removeChannel: (state, action: PayloadAction<string>) => {
            if (action.payload in state.dmChannels)
                delete state.dmChannels[action.payload];
        },
        addChannels: (state: ChannelState, action: PayloadAction<Channel[]>) => {
            for (let channel of action.payload as Channel[]) {
                state.dmChannels[channel.id] = channel;
            }
        }
    }
});

export const {addChannel, removeChannel, addChannels} = channelSlice.actions;