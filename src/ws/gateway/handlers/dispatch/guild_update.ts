import store from "../../../../store";
import Snowflake from "../../../../types/snowflake";
import {replaceSnowflakeArrWithObj} from "../../../../utils";
import {addGuild} from "../../../../states/guilds";
import Guild from "../../../../types/guild";

export interface GuildUpdateHandlerData extends Guild {}

export default function guildUpdateHandler(data: GuildUpdateHandlerData) {
    data.roles = replaceSnowflakeArrWithObj(data.roles as unknown as Snowflake[]);
    data.emojis = replaceSnowflakeArrWithObj(data.emojis as unknown as Snowflake[]);
    data.stickers = replaceSnowflakeArrWithObj(data.stickers as unknown as Snowflake[]);
    data.guild_scheduled_events = replaceSnowflakeArrWithObj(data.guild_scheduled_events as unknown as Snowflake[]);

    store.dispatch(addGuild(data as Guild));
}