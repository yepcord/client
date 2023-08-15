import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Guild from "../types/guild";

export interface GuildsState {
    guilds: {
        [key: string]: Guild
    },
    selectedGuild: Guild | null,
}

export const guildState = createSlice({
    "name": "guild",
    initialState: {
        guilds: {},
        selectedGuild: null,
    } as GuildsState,
    reducers: {
        addGuild: (state: GuildsState, action: PayloadAction<Guild>) => {
            const guild: Guild = action.payload;
            guild.id in state.guilds ? state.guilds[guild.id] = guild : Object.assign(state.guilds[guild.id], guild);
        },
        removeGuild: (state: GuildsState, action: PayloadAction<string>) => {
            if (action.payload in state.guilds)
                delete state.guilds[action.payload];
        },
        addGuilds: (state: GuildsState, action: PayloadAction<Guild[]>) => {
            for (let guild of action.payload as Guild[]) {
                guild.id in state.guilds ? Object.assign(state.guilds[guild.id], guild) : state.guilds[guild.id] = guild;
            }
        },
        setSelectedGuild: (state: GuildsState, action: PayloadAction<string|null>) => {
            let guild = action.payload ? state.guilds[action.payload] : null;
            state.selectedGuild = guild ? guild : null;
        },
    }
});

export const {addGuild, addGuilds, removeGuild, setSelectedGuild} = guildState.actions;