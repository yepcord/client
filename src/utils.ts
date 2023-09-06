import store from "./store";
import {addChannel, setSelectedChannel} from "./states/channels";
import Snowflake from "./types/snowflake";
import ApiClient from "./api/client";
import {setToken} from "./states/app";
import {SNOWFLAKE_EPOCH} from "./constants";
import Channel, {ChannelType} from "./types/channel";
import {Area} from "react-easy-crop/types";

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

export function getRadianAngle(degreeValue: number) {
    return (degreeValue * Math.PI) / 180;
}

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