import Channel, {ChannelType} from "./channel";
import Snowflake from "./snowflake";
import Emoji from "./emoji";
import User from "./user";

export type GuildFeatures =
    "ANIMATED_ICON"
    | "BANNER"
    | "COMMERCE"
    | "COMMUNITY"
    | "DISCOVERABLE"
    |
    "ENABLED_DISCOVERABLE_BEFORE"
    | "FORCE_RELAY"
    | "RELAY_ENABLED"
    | "INVITE_SPLASH"
    | "MEMBER_VERIFICATION_GATE_ENABLED"
    |
    "MORE_EMOJI"
    | "NEWS"
    | "PARTNERED"
    | "VERIFIED"
    | "VANITY_URL"
    | "VIP_REGIONS"
    | "WELCOME_SCREEN_ENABLED"
    |
    "DISCOVERY_DISABLED"
    | "PREVIEW_ENABLED"
    | "MORE_STICKERS"
    | "MONETIZATION_ENABLED"
    | "TICKETING_ENABLED"
    | "HUB"
    |
    "LINKED_TO_HUB"
    | "HAS_DIRECTORY_ENTRY"
    | "THREADS_ENABLED"
    | "THREADS_ENABLED_TESTING"
    | "NEW_THREAD_PERMISSIONS"
    |
    "THREE_DAY_THREAD_ARCHIVE"
    | "SEVEN_DAY_THREAD_ARCHIVE"
    | "THREAD_DEFAULT_AUTO_ARCHIVE_DURATION"
    | "ROLE_ICONS"
    |
    "INTERNAL_EMPLOYEE_ONLY"
    | "PREMIUM_TIER_3_OVERRIDE"
    | "MEMBER_PROFILES"
    | "ROLE_SUBSCRIPTIONS_ENABLED"
    |
    "ROLE_SUBSCRIPTIONS_ENABLED_FOR_PURCHASE"
    | "ANIMATED_BANNER"
    | "TEXT_IN_VOICE_ENABLED";

export default interface Guild {
    id: string,
    name?: string,
    icon?: string | null,
    banner?: string | null,
    splash?: string | null,
    owner_id?: string,
    joined_at?: string,
    features?: GuildFeatures[],
    afk_channel_id?: string | null,
    system_channel_id?: string | null,
    afk_timeout?: number,
    application_id?: string | null,
    default_message_notifications?: number,
    description?: string | null,
    discovery_splash?: string | null,
    explicit_content_filter?: number,
    home_header?: unknown,
    hub_type?: unknown,
    incidents_data?: unknown,
    latest_onboarding_question_id?: unknown,
    max_members?: number,
    max_stage_video_channel_users?: number,
    max_video_channel_users?: number,
    mfa_level?: number,
    nsfw?: boolean,
    nsfw_level?: number,
    preferred_locale?: string,
    premium_progress_bar_enabled?: boolean,
    premium_tier?: number,
    public_updates_channel_id?: string | null,
    region?: string,
    rules_channel_id?: string | null,
    safety_alerts_channel_id?: string | null,
    system_channel_flags?: number,
    vanity_url_code?: string | null,
    verification_level?: number,
    widget_channel_id?: string | null,
    widget_enabled?: boolean,
    channels?: {
        [key: string]: Channel,
    },
    roles?: {
        [key: string]: Snowflake, // TODO: add Role type
    },
    large?: boolean,
    laze?: boolean,
    member_count?: number,
    premium_subscription_count?: number,
    application_command_counts?: unknown,
    emojis?: {
        [key: string]: Emoji, // TODO: add Emoji type
    },
    guild_scheduled_events?: {
        [key: string]: Snowflake, // TODO: add ScheduledEvent type
    },
    stage_instances?: unknown[],
    stickers?: {
        [key: string]: Snowflake, // TODO: add Sticker type
    },
    threads?: {
        [key: string]: Snowflake, // TODO: add Thread type
    },
    version?: number,
    members: {
        [key: string]: GuildMember, // TODO: add GuildMember type
    },
}

export interface GuildMember extends Snowflake {
    id: string,
    nick: string | null,
    avatar: string | null,
    mute: boolean,
    deaf: boolean,
    pending?: boolean,
    is_pending?: boolean,
    joined_at: string,
    flags: number,
    roles: string[],
    communication_disabled_until?: number | null,
}

interface InviteInfo {
    channel: {
        id: string,
        name: string,
        type: ChannelType,
    },
    code: string,
    expires_at: string,
    guild: {
        id: string,
        name: string,
        description: string | null,
        banner: string | null,
        icon: string | null,
        splash: string | null,
        vanity_url_code: string | null,
        features: string[],
        nsfw: boolean,
        nsfw_level: number,
        premuim_subscription_count: number,
        verification_level: number,
    },
    inviter: User,
    new_member: boolean,
    temporary: boolean,
    type: number,
    uses: number,
}

export enum Permissions {
    CREATE_INSTANT_INVITE = 1 << 0,
    KICK_MEMBERS = 1 << 1,
    BAN_MEMBERS = 1 << 2,
    ADMINISTRATOR = 1 << 3,
    MANAGE_CHANNELS = 1 << 4,
    MANAGE_GUILD = 1 << 5,
    ADD_REACTIONS = 1 << 6,
    VIEW_AUDIT_LOG = 1 << 7,
    PRIORITY_SPEAKER = 1 << 8,
    STREAM = 1 << 9,
    VIEW_CHANNEL = 1 << 10,
    SEND_MESSAGES = 1 << 11,
    SEND_TTS_MESSAGES = 1 << 12,
    MANAGE_MESSAGES = 1 << 13,
    EMBED_LINKS = 1 << 14,
    ATTACH_FILES = 1 << 15,
    READ_MESSAGE_HISTORY = 1 << 16,
    MENTION_EVERYONE = 1 << 17,
    USE_EXTERNAL_EMOJIS = 1 << 18,
    VIEW_GUILD_INSIGHTS = 1 << 19,
    CONNECT = 1 << 20,
    SPEAK = 1 << 21,
    MUTE_MEMBERS = 1 << 22,
    DEAFEN_MEMBERS = 1 << 23,
    MOVE_MEMBERS = 1 << 24,
    USE_VAD = 1 << 25,
    CHANGE_NICKNAME = 1 << 26,
    MANAGE_NICKNAMES = 1 << 27,
    MANAGE_ROLES = 1 << 28,
    MANAGE_WEBHOOKS = 1 << 29,
    MANAGE_EMOJIS_AND_STICKERS = 1 << 30,
    USE_APPLICATION_COMMANDS = 1 << 31,

    // JS doesn't allow to shift more than 32 bits
    REQUEST_TO_SPEAK = 4294967296, // 1 << 32
    MANAGE_EVENTS = 8589934592, // 1 << 33
    MANAGE_THREADS = 17179869184, // 1 << 34
    CREATE_PUBLIC_THREADS = 34359738368, // 1 << 35
    CREATE_PRIVATE_THREADS = 68719476736, // 1 << 36
    USE_EXTERNAL_STICKERS = 137438953472, // 1 << 37
    SEND_MESSAGES_IN_THREADS = 274877906944, // 1 << 38
    USE_EMBEDDED_ACTIVITIES = 549755813888, // 1 << 39
    MODERATE_MEMBERS = 1099511627776, // 1 << 40
}