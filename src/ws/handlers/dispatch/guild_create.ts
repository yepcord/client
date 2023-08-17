import store from "../../../store";
import Snowflake from "../../../types/snowflake";
import Channel from "../../../types/channel";
import {replaceSnowflakeArrWithObj} from "../../../utils";
import {addGuild} from "../../../states/guilds";
import Guild from "../../../types/guild";

export interface GuildCreateHandlerData extends Guild {}

export default function guildCreateHandler(data: GuildCreateHandlerData) {
    data.channels = replaceSnowflakeArrWithObj(data.channels as unknown as Channel[]);
    data.roles = replaceSnowflakeArrWithObj(data.roles as unknown as Snowflake[]);
    data.emojis = replaceSnowflakeArrWithObj(data.emojis as unknown as Snowflake[]);
    data.stickers = replaceSnowflakeArrWithObj(data.stickers as unknown as Snowflake[]);
    data.threads = replaceSnowflakeArrWithObj(data.threads as unknown as Snowflake[]);
    data.guild_scheduled_events = replaceSnowflakeArrWithObj(data.guild_scheduled_events as unknown as Snowflake[]);
    data.members = replaceSnowflakeArrWithObj(data.members as unknown as Snowflake[]);

    store.dispatch(addGuild(data as Guild));
}