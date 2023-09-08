import store from "../../../../store";
import {updateGuildMembers} from "../../../../states/guilds";
import {GuildMember} from "../../../../types/guild";
import User, {Presence} from "../../../../types/user";
import {addUsers} from "../../../../states/users";

interface DataGuildMember extends GuildMember {
    user: User,
}

export interface GuildMembersChunkHandlerData {
    members: DataGuildMember[],
    presences: Presence[],
    chunk_index: number,
    chunk_count: number,
    guild_id: string,
}

export default function guildMembersChunkHandler(data: GuildMembersChunkHandlerData) {
    const members: GuildMember[] = [];
    const users: User[] = [];

    for(let member of data.members) {
        users.push(member.user)
        members.push({
            id: member.user.id,
            ...(({ id, user, ...o }) => o)(member),
        });
    }

    store.dispatch(addUsers(users));
    store.dispatch(updateGuildMembers({id: data.guild_id, members: members}));
}