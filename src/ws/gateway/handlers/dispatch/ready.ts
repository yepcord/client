import store from "../../../../store";
import {setCurrentUser, setSettings, setWsReady} from "../../../../states/app";
import {addGuilds} from "../../../../states/guilds";
import {addPresence, addRelationships, addUsers} from "../../../../states/users";
import {addChannels} from "../../../../states/channels";
import User, {Relationship, UserMe, UserSettings} from "../../../../types/user";
import Channel from "../../../../types/channel";
import Guild, {GuildFeatures} from "../../../../types/guild";
import {replaceSnowflakeArrWithObj} from "../../../../utils";
import Snowflake from "../../../../types/snowflake";

export interface ReadyHandlerData {
    user: UserMe,
    user_settings: UserSettings,
    user_settings_proto: string,
    guilds: {
        application_command_counts: unknown[],
        channels: Channel[] | {[key:string]: Channel},
        data_mode: string,
        id: string,
        joined_at: string,
        large: boolean,
        lazy: boolean,
        member_count: number,
        premium_subscription_count: number,
        properties?: {
            afk_channel_id: string | null,
            afk_timeout: number,
            application_id: string | null,
            banner: string | null,
            default_message_notifications: number,
            description: string | null,
            discovery_splash: string | null,
            explicit_content_filter: number,
            features: GuildFeatures,
            home_header: unknown,
            hub_type: unknown,
            icon: string | null,
            id: string,
            incidents_data: unknown,
            latest_onboarding_question_id: string | null,
            max_members: number,
            max_stage_video_channel_users: number,
            max_video_channel_users: number,
            mfa_level: number,
            name: string,
            nsfw: boolean,
            nsfw_level: number,
            owner_id: string,
            preferred_locale: string,
            premium_progress_bar_enabled: false,
            premium_tier: number,
            public_updates_channel_id: string | null,
            region: string,
            rules_channel_id: string | null,
            safety_alerts_channel_id: string | null,
            splash: string | null,
            system_channel_flags: number,
            system_channel_id: string | null,
            vanity_url_code: string | null,
            verification_level: number,
            widget_channel_id: string | null,
            widget_enabled: boolean,
        },
        emojis: unknown[] | {[key:string]: unknown}, // TODO: add Emoji type
        guild_scheduled_event: unknown[] | {[key:string]: unknown}, // TODO: add ScheduledEvent type
        roles: unknown[] | {[key:string]: unknown}, // TODO: add Role type
        stickers: unknown[] | {[key:string]: unknown}, // TODO: add Sticker type
        threads: unknown[] | {[key:string]: unknown}, // TODO: add Thread type
        stage_instances: unknown[],
        version: number,
    }[],
    resume_gateway_url: string,
    session_id: string,
    session_type: string,
    consents: {
        personalization?: {
            consented: boolean
        },
        usage_statistics?: {
            consented: boolean
        },
    },
    country_code: string,
    geo_ordered_rtc_regions: string[],
    private_channels: {
        id: string,
        last_message_id?: string | null,
        recipient_ids?: string[],
        recipients?: User[],
        type: number,
    }[],
    connected_accounts: unknown[],
    experiments: unknown[],
    guild_experiments: unknown[],
    guild_join_requests: unknown[],
    merged_members: unknown[],
    presences: unknown[],
    read_state: {
        entries: unknown[],
        partial: boolean,
        version: number,
    },
    sessions: unknown[],
    tutorial: unknown,
    user_guild_settings: {
        entries: unknown[],
        partial: boolean,
        version: number,
    },
    users: User[],
    v: number,
    relationships: Relationship[],
}

export default function readyHandler(data: ReadyHandlerData) {
    store.dispatch(setCurrentUser(data.user));
    store.dispatch(setSettings(data.user_settings));

    let guilds: Guild[] = [];
    for(let guild of data.guilds) {
        Object.assign(guild, guild.properties);
        delete guild.properties;
        guild.channels = replaceSnowflakeArrWithObj(guild.channels as Channel[]);
        guild.roles = replaceSnowflakeArrWithObj(guild.roles as Snowflake[]);
        guild.emojis = replaceSnowflakeArrWithObj(guild.emojis as Snowflake[]);
        guild.stickers = replaceSnowflakeArrWithObj(guild.stickers as Snowflake[]);
        guild.threads = replaceSnowflakeArrWithObj(guild.threads as Snowflake[]);

        guilds.push(guild as unknown as Guild);
    }
    store.dispatch(addGuilds(guilds));
    store.dispatch(addUsers(data.users));
    for(let dm of data.private_channels) {
        dm.recipients = dm.recipient_ids!.map((userId: string) => store.getState().users.users[userId]);
        delete dm.recipient_ids;
    }
    store.dispatch(addChannels(data.private_channels as Channel[]));
    store.dispatch(addRelationships(data.relationships));

    const self_presence = {
        "user_id": data.user.id,
        "status": data.user_settings.status,
    } // TODO: add custom status
    store.dispatch(addPresence(self_presence));

    store.dispatch(setWsReady(true));
}