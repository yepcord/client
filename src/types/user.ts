import Snowflake from "./snowflake";

export default interface User extends Snowflake {
    id: string,
    username: string,
    discriminator: string,
    avatar: string | null,
    banner: string | null,
    bio: string | null,
    bot?: boolean,
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

export type UserStatus = "online" | "offline" | "idle" | "dnd";

export interface Presence {
    user_id: string,
    status: UserStatus,
    activities?: PresenceActivity[],
    client_status?: {
        desktop?: UserStatus,
        mobile?: UserStatus,
    },
    last_modified?: number,
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

export interface UserSettings {
    activity_restricted_guild_ids: string[],
    afk_timeout: number,
    allow_accessibility_detection: boolean,
    animate_emoji: boolean,
    animate_stickers: number,
    contact_sync_enabled: boolean,
    convert_emoticons: boolean,
    custom_status: unknown, // TODO: add custom status type
    default_guilds_restricted: boolean,
    detect_platform_accounts: boolean,
    developer_mode: boolean,
    disable_games_tab: boolean,
    enable_tts_command: boolean,
    explicit_content_filter: number,
    friend_discovery_flags: number,
    friend_source_flags: {
        all: boolean,
        mutual_friends?: boolean,
        mutual_guilds?: boolean
    },
    gif_auto_play: boolean,
    guild_folders: unknown[],
    guild_positions: unknown[],
    inline_attachment_media: boolean,
    inline_embed_media: boolean,
    locale: string,
    message_display_compact: boolean,
    native_phone_integration_enabled: boolean,
    passwordless: boolean,
    render_embeds: boolean,
    render_reactions: boolean,
    restricted_guilds: unknown[],
    show_current_game: boolean,
    status: UserStatus,
    stream_notifications_enabled: boolean,
    theme: "dark" | "light",
    timezone_offset: number,
    view_nsfw_commands: boolean,
    view_nsfw_guilds: boolean,
}