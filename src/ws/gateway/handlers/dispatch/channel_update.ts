import store from "../../../../store";
import Channel from "../../../../types/channel";
import {addGuildChannel, GuildsState} from "../../../../states/guilds";
import {addChannel, updateSelectedChannel} from "../../../../states/channels";
import Guild from "../../../../types/guild";

export interface ChannelUpdateHandlerData extends Channel {
}

export default function channelUpdateHandler(data: ChannelUpdateHandlerData) {
    if (data.guild_id && data.guild_id in store.getState().guild.guilds) {
        store.dispatch(addGuildChannel(data));
        if(store.getState().channel.selectedChannel?.id === data.id)
            store.dispatch(updateSelectedChannel(data));
    } else if (!data.guild_id) {
        store.dispatch(addChannel(data));
    }
}