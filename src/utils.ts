import store from "./store";
import {setSelectedChannel} from "./states/channels";
import Snowflake from "./types/snowflake";

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