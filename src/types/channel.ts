import User from "../types/user";
import Snowflake from "./snowflake";

export enum ChannelType {
    GUILD_TEXT = 0,
    DM = 1,
    GUILD_VOICE = 2,
    GROUP_DM = 3,
    GUILD_CATEGORY = 4,
    GUILD_NEWS = 5,
    GUILD_NEWS_THREAD = 10,
    GUILD_PUBLIC_THREAD = 11,
    GUILD_PRIVATE_THREAD = 12,
    GUILD_STAGE_VOICE = 13,
    GUILD_DIRECTORY = 14,
}

export default interface Channel extends Snowflake {
    id: string,
    type: number,
    name: string | null,
    icon: string | null,
    recipients: User[] | null,
    last_message_id: string | null,
    parent_id: string | null,
    position: number | null,
    guild_id: string | null,
    nsfw: boolean,
    permission_overwrites: unknown[],
    topic: string | null,
    rate_limit_per_user: number | null,
}