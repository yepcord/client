import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Message} from "../types/message";
import {sortedMessageIndex} from "../utils";

export interface MessagesState {
    messages: {
        [key: string]: Message[],
    },
    info: {
        [key: string]: {
            minimal: string | null,
            all: boolean,
        }
    }
    profileMenuElementId: string | null,
    editing: string | null,
    replying_to: string | null,
}

export const messageState = createSlice({
    "name": "message",
    initialState: {
        messages: {},
        info: {},
        profileMenuElementId: null,
        editing: null,
        replying_to: null,
    } as MessagesState,
    reducers: {
        addMessage: (state: MessagesState, action: PayloadAction<Message>) => {
            const message: Message = action.payload;
            if(!(message.channel_id in state.messages)) {
                state.messages[message.channel_id] = [];
                state.info[message.channel_id] = {minimal: message.id, all: false};
            }
            const messages = state.messages[message.channel_id];
            const info = state.info[message.channel_id];

            const idx = sortedMessageIndex(messages, message.id);

            messages[idx]?.id === message.id ? Object.assign(messages[idx], message) : messages.splice(idx, 0, message);

            if(info.minimal === null || BigInt(message.id) < BigInt(info.minimal))
                info.minimal = message.id;
        },
        removeMessage: (state: MessagesState, action: PayloadAction<{id: string, channel_id: string}>) => {
            const id = action.payload.id;
            const channel_id = action.payload.channel_id;
            if(!(channel_id in state.messages)) return;

            const idx = sortedMessageIndex(state.messages[channel_id], id);
            state.messages[channel_id][idx]?.id === id && state.messages[channel_id].splice(idx, 1);
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
        setMessageReply: (state: MessagesState, action: PayloadAction<string | null>) => {
            state.replying_to = action.payload;
        },
    }
});

export const {addMessage, removeMessage, setAllLoaded, setProfileMenuElement, setMessageEditing, setMessageReply} = messageState.actions;
