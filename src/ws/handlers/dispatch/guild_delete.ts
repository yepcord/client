import store from "../../../store";
import {removeGuild} from "../../../states/guilds";

export interface GuildDeleteHandlerData {
    id: string,
}

export default function guildDeleteHandler(data: GuildDeleteHandlerData) {
    store.dispatch(removeGuild(data.id));
}