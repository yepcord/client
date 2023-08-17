import store from "../../../store";
import Channel from "../../../types/channel";
import {removeGuildChannel} from "../../../states/guilds";
import {removeChannel} from "../../../states/channels";

export interface ChannelDeleteHandlerData extends Channel {
}

export default function channelDeleteHandler(data: ChannelDeleteHandlerData) {
    if (data.guild_id && data.guild_id in store.getState().guild.guilds) {
        store.dispatch(removeGuildChannel(data));
    } else if (!data.guild_id) {
        store.dispatch(removeChannel(data.id));
    }
}