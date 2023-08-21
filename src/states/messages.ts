import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Message} from "../types/message";

export interface MessagesState {
    messages: {
        [key: string]: {
            [key: string]: Message,
        }
    },
}

export const messageState = createSlice({
    "name": "message",
    initialState: {
        messages: {},
    } as MessagesState,
    reducers: {
        addMessage: (state: MessagesState, action: PayloadAction<Message>) => {
            const message: Message = action.payload;
            (!(message.channel_id in state.messages)) && (state.messages[message.channel_id] = {});
            const messages = state.messages[message.channel_id];
            message.id in messages ? Object.assign(messages[message.id], message) : messages[message.id] = message;
        },
        removeMessage: (state: MessagesState, action: PayloadAction<{id: string, channel_id: string}>) => {
            const id = action.payload.id;
            const channel_id = action.payload.channel_id;
            if(!(channel_id in state.messages)) return;
            id in state.messages[channel_id] && delete state.messages[channel_id][id];
        }
    }
});

export const {addMessage, removeMessage} = messageState.actions;