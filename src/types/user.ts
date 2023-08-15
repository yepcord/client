import Snowflake from "./snowflake";

export default interface User extends Snowflake {
    id: string,
    username: string,
    discriminator: string,
    avatar: string | null,
    banner: string | null,
    bio: string | null,
    bot: boolean,
    public_flags: number,
}

interface PresenceActivity {
    name: string,
    type: number,
    state: string,
    emoji: {
        emoji_id: string,
        emoji_name: string,
    } | null,
    timestamps: {
        start?: number,
        end?: number,
    } | null
}

export interface Presence {
    userId: string,
    status: "online" | "offline" | "idle" | "dnd",
    activities: PresenceActivity[]
}

export interface UserMe extends User {
    id: string,
    email: string,
    username: string,
    discriminator: string,
    bio: string,
    avatar: string | null,
    avatar_decoration?: number | null,
    banner: string | null,
    banner_color?: number | null,
    accent_color?: number | null,
    flags?: number,
    mfa_enabled?: boolean | null,
    mobile?: boolean,
    nsfw_allowed?: boolean,
    phone?: string | null,
    premium?: boolean,
    premium_since?: string,
    premium_type?: number,
    purchased_flags?: number,
    verified?: boolean,
}

export enum RelationshipType {
    FRIEND = 1,
    BLOCK = 2,
    REQUEST_RECEIVED = 3,
    REQUEST_SENT = 4,
}

export interface Relationship extends Snowflake {
    id: string,
    user_id: string,
    type: RelationshipType,
    nickname: string | null,
}