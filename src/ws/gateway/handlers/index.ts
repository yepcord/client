import {GatewayOp} from "../../../types/gateway";
import helloHandler, {HelloHandlerData} from "./hello/hello";
import readyHandler, {ReadyHandlerData} from "./dispatch/ready";
import readySupplementalHandler, {ReadySupplementalHandlerData} from "./dispatch/ready_supplemental";
import presenceUpdateHandler, {PresenceUpdateHandlerData} from "./dispatch/presence_update";
import guildCreateHandler, {GuildCreateHandlerData} from "./dispatch/guild_create";
import guildDeleteHandler, {GuildDeleteHandlerData} from "./dispatch/guild_delete";
import guildUpdateHandler, {GuildUpdateHandlerData} from "./dispatch/guild_update";
import channelCreateHandler, {ChannelCreateHandlerData} from "./dispatch/channel_create";
import channelUpdateHandler, {ChannelUpdateHandlerData} from "./dispatch/channel_update";
import channelDeleteHandler, {ChannelDeleteHandlerData} from "./dispatch/channel_delete";
import messageCreateHandler, {MessageCreateHandlerData} from "./dispatch/message_create";
import messageDeleteHandler, {MessageDeleteHandlerData} from "./dispatch/message_delete";
import messageUpdateHandler, {MessageUpdateHandlerData} from "./dispatch/message_update";
import relationshipAddHandler, {RelationshipAddHandlerData} from "./dispatch/relationship_add";
import relationshipRemoveHandler, {RelationshipRemoveHandlerData} from "./dispatch/relationship_remove";
import userUpdateHandler, {UserUpdateHandlerData} from "./dispatch/user_update";
import userSettingsProtoUpdateHandler, {SettingsProtoUpdateHandlerData} from "./dispatch/user_settings_proto_update";

type DispatchData = ReadyHandlerData | ReadySupplementalHandlerData | PresenceUpdateHandlerData | GuildCreateHandlerData |
    GuildDeleteHandlerData | GuildUpdateHandlerData | ChannelCreateHandlerData | ChannelUpdateHandlerData | ChannelDeleteHandlerData |
    MessageCreateHandlerData | MessageDeleteHandlerData | MessageUpdateHandlerData | RelationshipAddHandlerData |
    RelationshipRemoveHandlerData | SettingsProtoUpdateHandlerData;

interface GatewayMessage {
    op: GatewayOp,
    s: number,
    t: string | null,
    d: HelloHandlerData | DispatchData | null,
}

function handleDispatchMessage(type: string, data: DispatchData) {
    console.log(type);
    console.log(data);
    switch (type) {
        case "READY": {
            readyHandler(data as ReadyHandlerData);
            break;
        }
        case "READY_SUPPLEMENTAL": {
            readySupplementalHandler(data as ReadySupplementalHandlerData);
            break;
        }
        case "PRESENCE_UPDATE": {
            presenceUpdateHandler(data as PresenceUpdateHandlerData);
            break;
        }
        case "GUILD_CREATE": {
            guildCreateHandler(data as GuildCreateHandlerData);
            break;
        }
        case "GUILD_DELETE": {
            guildDeleteHandler(data as GuildDeleteHandlerData);
            break;
        }
        case "GUILD_UPDATE": {
            guildUpdateHandler(data as GuildUpdateHandlerData);
            break;
        }
        case "CHANNEL_CREATE": {
            channelCreateHandler(data as ChannelCreateHandlerData);
            break;
        }
        case "CHANNEL_UPDATE": {
            channelUpdateHandler(data as ChannelUpdateHandlerData);
            break;
        }
        case "CHANNEL_DELETE": {
            channelDeleteHandler(data as ChannelDeleteHandlerData);
            break;
        }
        case "MESSAGE_CREATE": {
            messageCreateHandler(data as MessageCreateHandlerData);
            break;
        }
        case "MESSAGE_DELETE": {
            messageDeleteHandler(data as MessageDeleteHandlerData);
            break;
        }
        case "MESSAGE_UPDATE": {
            messageUpdateHandler(data as MessageUpdateHandlerData);
            break;
        }
        case "RELATIONSHIP_ADD": {
            relationshipAddHandler(data as RelationshipAddHandlerData);
            break;
        }
        case "RELATIONSHIP_REMOVE": {
            relationshipRemoveHandler(data as RelationshipRemoveHandlerData);
            break;
        }
        case "USER_UPDATE": {
            userUpdateHandler(data as UserUpdateHandlerData);
            break;
        }
        case "USER_SETTINGS_PROTO_UPDATE": {
            userSettingsProtoUpdateHandler(data as SettingsProtoUpdateHandlerData);
            break;
        }
    }
}

export default function handleGatewayMessage(message: GatewayMessage) {
    switch (message.op) {
        case GatewayOp.HELLO: {
            helloHandler(message.d as HelloHandlerData);
            break;
        }
        case GatewayOp.DISPATCH: {
            handleDispatchMessage(message.t!, message.d as DispatchData);
            break;
        }
    }
}