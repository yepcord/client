import store from "./store";
import {addChannel, setSelectedChannel} from "./states/channels";
import Snowflake from "./types/snowflake";
import ApiClient from "./api/client";
import {setToken} from "./states/app";
import {SNOWFLAKE_EPOCH} from "./constants";
import Channel, {ChannelType} from "./types/channel";
import {Area} from "react-easy-crop/types";
import {PreloadedUserSettings, Theme} from "./proto/discord";
import {PartialUserSettings, UserSettings, UserStatus} from "./types/user";

export function selectChannel(channelId: string | null) {
    const global_state = store.getState();

    const guildChannel = channelId ? global_state.guild.selectedGuild?.channels![channelId] : null;
    const dmChannel = channelId ? global_state.channel.dmChannels[channelId] : null;

    return setSelectedChannel(guildChannel ? guildChannel : dmChannel);
}

export function replaceSnowflakeArrWithObj(arr: Snowflake[]) {
    const obj: {[key:string]: any} = {};
    for(let sf of arr) {
        obj[sf.id] = sf;
    }
    return obj;
}

export function logOut() {
    ApiClient.logout().then();
    store.dispatch(setToken(null));
}

let SF_INCREMENT = 0;

export function createSnowflake() {
    let snowflake = BigInt(Date.now()-SNOWFLAKE_EPOCH);
    snowflake = snowflake << BigInt(22);
    snowflake += BigInt(17) << BigInt(17);
    snowflake += BigInt(12) << BigInt(12);
    snowflake += BigInt(SF_INCREMENT);
    SF_INCREMENT++;

    return snowflake.toString();
}

export async function dmChannelByUserId(user_id: string) {
    for (let channel of Object.values(store.getState().channel.dmChannels)) {
        if(channel.type !== ChannelType.DM || channel.recipients === null) continue;
        for(let recipient of channel.recipients) {
            if(recipient.id === user_id) return channel;
        }
    }
    const resp = await ApiClient.getOrCreateDmChannel(user_id);
    if(resp.status !== 200) return null;

    const channel = resp.body as Channel;
    store.dispatch(addChannel(channel));

    return channel;
}

export function snowflakeToDate(sf: string) {
    const millis = Number(BigInt(sf) >> BigInt(22)) + SNOWFLAKE_EPOCH;
    return new Date(millis);
}

export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.setAttribute("crossOrigin", "anonymous");
        image.src = url;
    });

export async function getCroppedImg(
    imageSrc: string,
    pixelCrop: Area
) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        return null;
    }

    // set canvas size to match the bounding box
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);

    const data = ctx.getImageData(
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height
    );

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(data, 0, 0);

    return canvas.toDataURL();
}

export function protoToSettings(proto: PreloadedUserSettings): PartialUserSettings {
    const settings = {
        theme: (proto.appearance?.theme !== 1 ? "light" : "dark") as ("light" | "dark"),
        developer_mode: proto.appearance?.developerMode,
        locale: proto.localization?.locale?.value,
        timezone_offset: proto.localization?.timezoneOffset?.value,
        allow_accessibility_detection: proto.privacy?.allowAccessibilityDetection,
        default_guilds_restricted: proto.privacy?.defaultGuildsRestricted,
        activity_restricted_guild_ids: proto.privacy?.activityRestrictedGuildIds as unknown as string[],
        restricted_guilds: proto.privacy?.restrictedGuildIds,
        status: proto.status?.status?.value as (UserStatus | undefined),
        show_current_game: proto.status?.showCurrentGame?.value,
        use_rich_chat_input: proto.textAndImages?.useRichChatInput?.value,
        use_thread_sidebar: proto.textAndImages?.useThreadSidebar?.value,
        animate_stickers: proto.textAndImages?.animateStickers?.value,
        animate_emoji: proto.textAndImages?.animateEmoji?.value,
        convert_emoticons: proto.textAndImages?.convertEmoticons?.value,
        explicit_content_filter: proto.textAndImages?.explicitContentFilter?.value,
        inline_attachment_media: proto.textAndImages?.inlineAttachmentMedia?.value,
        inline_embed_media: proto.textAndImages?.inlineEmbedMedia?.value,
        message_display_compact: proto.textAndImages?.messageDisplayCompact?.value,
        render_embeds: proto.textAndImages?.renderEmbeds?.value,
        render_reactions: proto.textAndImages?.renderReactions?.value,
        render_spoilers: proto.textAndImages?.renderSpoilers?.value as ("ON_CLICK" | "IF_MODERATOR" | "ALWAYS"),
        view_nsfw_guilds: proto.textAndImages?.viewNsfwGuilds?.value,
        view_image_descriptions: proto.textAndImages?.viewImageDescriptions?.value,
        expression_suggestions_enabled: proto.textAndImages?.expressionSuggestionsEnabled?.value,
        afk_timeout: proto.voiceAndVideo?.afkTimeout?.value,
        stream_notifications_enabled: proto.voiceAndVideo?.streamNotificationsEnabled?.value,
        friend_source_flags: undefined as ({all: boolean, mutual_friends?: boolean, mutual_guilds?: boolean} | undefined),
    };

    if(proto.privacy?.friendSourceFlags) {
        let flags = {all: false, mutual_friends: false, mutual_guilds: false};
        if(proto.privacy?.friendSourceFlags.value === 14)
            flags["all"] = flags["mutual_friends"] = flags["mutual_guilds"] = true;
        else if(proto.privacy?.friendSourceFlags.value === 6)
            flags["mutual_friends"] = flags["mutual_guilds"] = true;
        else if(proto.privacy?.friendSourceFlags.value === 4)
            flags["mutual_guilds"] = true;
        else if(proto.privacy?.friendSourceFlags.value === 2)
            flags["mutual_friends"] = true;

        settings["friend_source_flags"] = flags;
    }

    for(let key of Object.keys(settings)) {
        const k = key as keyof typeof settings;
        if(settings[k] === undefined) delete settings[k];
    }

    return settings;
}

export function settingsToProto(settings: PartialUserSettings): PreloadedUserSettings {
    let friend_source_flags = 0;
    if(settings.friend_source_flags?.all)
        friend_source_flags = 14;
    else if(settings.friend_source_flags?.mutual_friends && settings.friend_source_flags?.mutual_guilds)
        friend_source_flags = 6;
    else if(settings.friend_source_flags?.mutual_guilds)
        friend_source_flags = 4;
    else if(settings.friend_source_flags?.mutual_friends)
        friend_source_flags = 2;

    return PreloadedUserSettings.create({
        voiceAndVideo: {
            afkTimeout: {value: settings.afk_timeout},
            streamNotificationsEnabled: {value: settings.stream_notifications_enabled},
        },
        textAndImages: {
            useRichChatInput: {value: settings.use_rich_chat_input},
            useThreadSidebar: {value: settings.use_thread_sidebar},
            renderSpoilers: {value: settings.render_spoilers},
            inlineAttachmentMedia: {value: settings.inline_attachment_media},
            inlineEmbedMedia: {value: settings.inline_embed_media},
            renderEmbeds: {value: settings.render_embeds},
            renderReactions: {value: settings.render_reactions},
            explicitContentFilter: {value: settings.explicit_content_filter},
            viewNsfwGuilds: {value: settings.view_nsfw_guilds},
            convertEmoticons: {value: settings.convert_emoticons},
            animateStickers: {value: settings.animate_stickers},
            animateEmoji: {value: settings.animate_emoji},
            expressionSuggestionsEnabled: {value: settings.expression_suggestions_enabled},
            messageDisplayCompact: {value: settings.message_display_compact},
            viewImageDescriptions: {value: settings.view_image_descriptions},
        },
        privacy: {
            friendSourceFlags: {value: friend_source_flags},
            defaultGuildsRestricted: settings.default_guilds_restricted,
            allowAccessibilityDetection: settings.allow_accessibility_detection,
        },
        status: {
            status: {value: settings.status},
            showCurrentGame: {value: settings.show_current_game},
        },
        localization: {
            locale: {value: settings.locale},
            timezoneOffset: {value: settings.timezone_offset},
        },
        appearance: {
            theme: settings.theme === "dark" ? Theme.DARK : Theme.LIGHT,
            developerMode: settings.developer_mode,
        }
    });
}

export function b64decode(b64: string) {
    return Uint8Array.from(atob(b64), c => c.charCodeAt(0));
}

export function b64encode(data: Uint8Array) {
    return btoa(new Uint8Array(data).reduce((acc, current) => acc + String.fromCharCode(current), ""));
}

export function mergeProtoSettings(settings: UserSettings, proto: PreloadedUserSettings) {
    const settings_proto = settingsToProto(settings);
    PreloadedUserSettings.mergePartial(settings_proto, proto);
    return protoToSettings(settings_proto);
}

export async function updateSettings(old_settings: UserSettings, new_settings: PartialUserSettings) {
    const proto = settingsToProto({...old_settings, ...new_settings});
    return await ApiClient.updateUserSettings(b64encode(PreloadedUserSettings.toBinary(proto)));
}

export function checkPermissions(channel_id: string, permission: number) {
    return true; // TODO: implement permissions
}