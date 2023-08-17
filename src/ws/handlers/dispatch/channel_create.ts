import store from "../../../store";
import Channel from "../../../types/channel";
import {addGuildChannel} from "../../../states/guilds";
import {addChannel} from "../../../states/channels";

export interface ChannelCreateHandlerData extends Channel {
}

export default function channelCreateHandler(data: ChannelCreateHandlerData) {
    if (data.guild_id && data.guild_id in store.getState().guild.guilds) {
        store.dispatch(addGuildChannel(data));
    } else if (!data.guild_id) {
        store.dispatch(addChannel(data));
    }
}