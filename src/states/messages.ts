import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Message} from "../types/message";

export interface MessagesState {
    messages: {
        [key: string]: {
            [key: string]: Message,
        }
    },
    info: {
        [key: string]: {
            minimal: string | null,
            all: boolean,
        }
    }
    profileMenuElementId: string | null,
    editing: string | null,
}

export const messageState = createSlice({
    "name": "message",
    initialState: {
        messages: {},
        info: {},
        profileMenuElementId: null,
        editing: null,
    } as MessagesState,
    reducers: {
        addMessage: (state: MessagesState, action: PayloadAction<Message>) => {
            const message: Message = action.payload;
            if(!(message.channel_id in state.messages)) {
                state.messages[message.channel_id] = {};
                state.info[message.channel_id] = {minimal: message.id, all: false};
            }
            const messages = state.messages[message.channel_id];
            const info = state.info[message.channel_id];

            message.id in messages ? Object.assign(messages[message.id], message) : messages[message.id] = message;

            if(info.minimal === null || BigInt(message.id) < BigInt(info.minimal))
                info.minimal = message.id;
        },
        removeMessage: (state: MessagesState, action: PayloadAction<{id: string, channel_id: string}>) => {
            const id = action.payload.id;
            const channel_id = action.payload.channel_id;
            if(!(channel_id in state.messages)) return;
            id in state.messages[channel_id] && delete state.messages[channel_id][id];
        },
        setAllLoaded: (state: MessagesState, action: PayloadAction<string>) => {
            const channel_id = action.payload;
            if(!(channel_id in state.info)) state.info[channel_id] = {minimal: null, all: false};
            state.info[channel_id].all = true;
        },
        setProfileMenuElement: (state: MessagesState, action: PayloadAction<string | null>) => {
            state.profileMenuElementId = action.payload;
        },
        setMessageEditing: (state: MessagesState, action: PayloadAction<string | null>) => {
            state.editing = action.payload;
        },
    }
});

export const {addMessage, removeMessage, setAllLoaded, setProfileMenuElement, setMessageEditing} = messageState.actions;