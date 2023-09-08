import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Guild, {GuildMember} from "../types/guild";
import Channel from "../types/channel";

export interface GuildsState {
    guilds: {
        [key: string]: Guild
    },
    selectedGuild: Guild | null,
}

function updateSelectedGuildIfNeeded(state: GuildsState, guild: Guild) {
    if(state.selectedGuild?.id === guild.id)
        state.selectedGuild ? Object.assign(state.selectedGuild, guild) : state.selectedGuild = guild;
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
            guild.id in state.guilds ? Object.assign(state.guilds[guild.id], guild) : state.guilds[guild.id] = guild;

            updateSelectedGuildIfNeeded(state, state.guilds[guild.id]);
        },
        removeGuild: (state: GuildsState, action: PayloadAction<string>) => {
            if (action.payload in state.guilds)
                delete state.guilds[action.payload];
        },
        addGuilds: (state: GuildsState, action: PayloadAction<Guild[]>) => {
            for (let guild of action.payload as Guild[]) {
                guild.id in state.guilds ? Object.assign(state.guilds[guild.id], guild) : state.guilds[guild.id] = guild;
                updateSelectedGuildIfNeeded(state, state.guilds[guild.id]);
            }
        },
        setSelectedGuild: (state: GuildsState, action: PayloadAction<string|null>) => {
            let guild = action.payload ? state.guilds[action.payload] : null;
            state.selectedGuild = guild ? guild : null;
        },
        addGuildChannel: (state: GuildsState, action: PayloadAction<Channel>) => {
            const channel = action.payload;
            if(!(channel.guild_id! in state.guilds)) return;
            const guild = state.guilds[channel.guild_id!];
            channel.id in guild.channels! ? Object.assign(guild.channels![channel.id], channel) : guild.channels![channel.id] = channel;

            updateSelectedGuildIfNeeded(state, guild);
        },
        removeGuildChannel: (state: GuildsState, action: PayloadAction<Channel>) => {
            const channel = action.payload;
            if(!(channel.guild_id! in state.guilds)) return;
            const guild = state.guilds[channel.guild_id!];
            channel.id in guild.channels! && (delete guild.channels![channel.id]);

            updateSelectedGuildIfNeeded(state, guild);
        },
        updateGuildMembers: (state: GuildsState, action: PayloadAction<{id: string, members: GuildMember[]}>) => {
            const guild = state.guilds[action.payload.id];
            if(!guild) return;

            for(let member of action.payload.members) {
                member.id in guild.members ? Object.assign(guild.members[member.id], member) : guild.members[member.id] = member;
            }

            updateSelectedGuildIfNeeded(state, guild);
        },
    }
});

export const {addGuild, addGuilds, removeGuild, setSelectedGuild, addGuildChannel, removeGuildChannel, updateGuildMembers} = guildState.actions;