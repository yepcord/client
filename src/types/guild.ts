import Channel from "./channel";

export type GuildFeatures = "ANIMATED_ICON" | "BANNER" | "COMMERCE" | "COMMUNITY" | "DISCOVERABLE" |
    "ENABLED_DISCOVERABLE_BEFORE" | "FORCE_RELAY" | "RELAY_ENABLED" | "INVITE_SPLASH" | "MEMBER_VERIFICATION_GATE_ENABLED" |
    "MORE_EMOJI" | "NEWS" | "PARTNERED" | "VERIFIED" | "VANITY_URL" | "VIP_REGIONS" | "WELCOME_SCREEN_ENABLED" |
    "DISCOVERY_DISABLED" | "PREVIEW_ENABLED" | "MORE_STICKERS" | "MONETIZATION_ENABLED" | "TICKETING_ENABLED" | "HUB" |
    "LINKED_TO_HUB" | "HAS_DIRECTORY_ENTRY" | "THREADS_ENABLED" | "THREADS_ENABLED_TESTING" | "NEW_THREAD_PERMISSIONS" |
    "THREE_DAY_THREAD_ARCHIVE" | "SEVEN_DAY_THREAD_ARCHIVE" | "THREAD_DEFAULT_AUTO_ARCHIVE_DURATION" | "ROLE_ICONS" |
    "INTERNAL_EMPLOYEE_ONLY" | "PREMIUM_TIER_3_OVERRIDE" | "MEMBER_PROFILES" | "ROLE_SUBSCRIPTIONS_ENABLED" |
    "ROLE_SUBSCRIPTIONS_ENABLED_FOR_PURCHASE" | "ANIMATED_BANNER" | "TEXT_IN_VOICE_ENABLED";

export default interface Guild {
    id: string,
    name: string,
    icon: string | null,
    banner: string | null,
    splash: string | null,
    owner_id: string,
    joined_at: string,
    features: GuildFeatures[],
    afk_channel_id: string | null,
    system_channel_id: string | null,
    afk_timeout: number,
    application_id: string | null,
    default_message_notifications: number,
    description: string | null,
    discovery_splash: string | null,
    explicit_content_filter: number,
    home_header: unknown,
    hub_type: unknown,
    incidents_data: unknown,
    latest_onboarding_question_id: unknown,
    max_members: number,
    max_stage_video_channel_users: number,
    max_video_channel_users: number,
    mfa_level: number,
    nsfw: boolean,
    nsfw_level: number,
    preferred_locale: string,
    premium_progress_bar_enabled: boolean,
    premium_tier: number,
    public_updates_channel_id: string | null,
    region: string,
    rules_channel_id: string | null,
    safety_alerts_channel_id: string | null,
    system_channel_flags: number,
    vanity_url_code: string | null,
    verification_level: number,
    widget_channel_id: string | null,
    widget_enabled: boolean,
    channels: {
        [key:string]: Channel,
    },
    roles: {
        [key:string]: unknown, // TODO: add Role type
    },
    large: boolean,
    laze: boolean,
    member_count: number,
    premium_subscription_count: number,
    application_command_counts: unknown,
    emojis: {
        [key:string]: unknown, // TODO: add Emoji type
    },
    guild_scheduled_events: {
        [key:string]: unknown, // TODO: add ScheduledEvent type
    },
    stage_instances: unknown[],
    stickers: {
        [key:string]: unknown, // TODO: add Sticker type
    },
    threads: {
        [key:string]: unknown, // TODO: add Thread type
    },
    version: number,
}