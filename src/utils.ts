import store from "./store";
import {setSelectedChannel} from "./states/channels";
import Snowflake from "./types/snowflake";
import ApiClient from "./api/client";
import {setToken} from "./states/app";
import {SNOWFLAKE_EPOCH} from "./constants";
import {RefObject, useEffect, useMemo, useState} from "react";

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

export function createSnowflake() {
    let snowflake = BigInt(Date.now()-SNOWFLAKE_EPOCH);
    snowflake = snowflake << BigInt(22);
    snowflake += BigInt(17) << BigInt(17);
    snowflake += BigInt(12) << BigInt(12);
    snowflake += BigInt(4095);

    return snowflake.toString();
}