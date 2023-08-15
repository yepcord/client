import {useDispatch} from "react-redux";
import useWebSocket from "react-use-websocket";
import {GATEWAY_ENDPOINT, VERSION_NUMBER} from "../constants";
import {setCurrentUser, setWsReady} from "../states/app";
import {SendJsonMessage} from "react-use-websocket/src/lib/types";
import {GatewayOp} from "../types/gateway";
import store from "../store";
import Snowflake from "../types/snowflake";
import {addGuilds} from "../states/guilds";
import {addPresence, addPresences, addRelationships, addUser, addUsers} from "../states/users";
import {addChannels} from "../states/channels";

function replaceSnowflakeArrWithObj(arr: Snowflake[]) {
    const obj: {[key:string]: any} = {};
    for(let sf of arr) {
        obj[sf.id] = sf;
    }
    return obj;
}

function handleDispatchMessage(type: string, data: any) {
    console.log(type);
    console.log(data);
    switch (type) {
        case "READY": {
            store.dispatch(setCurrentUser(data.user));
            for(let guild of data.guilds) {
                Object.assign(guild, guild.properties);
                delete guild.properties;
                guild.channels = replaceSnowflakeArrWithObj(guild.channels);
                guild.roles = replaceSnowflakeArrWithObj(guild.roles);
                guild.emojis = replaceSnowflakeArrWithObj(guild.emojis);
                guild.stickers = replaceSnowflakeArrWithObj(guild.stickers);
                guild.threads = replaceSnowflakeArrWithObj(guild.threads);
            }
            store.dispatch(addGuilds(data.guilds));
            store.dispatch(addUsers(data.users));
            for(let dm of data.private_channels) {
                dm.recipients = dm.recipient_ids.map((userId: string) => store.getState().users.users[userId]);
                delete dm.recipient_ids;
            }
            store.dispatch(addChannels(data.private_channels));
            store.dispatch(addRelationships(data.relationships));

            const self_presence = {
                "user_id": data.user.id,
                "status": data.user_settings.status,
            } // TODO: add custom status
            store.dispatch(addPresence(self_presence))
            break;
        }
        case "READY_SUPPLEMENTAL": {
            store.dispatch(addPresences(data.merged_presences.friends))
            store.dispatch(addPresences(data.merged_presences.guilds))
            break;
        }
        case "PRESENCE_UPDATE": {
            store.dispatch(addUser(data.user));
            data.user_id = data.user.id;
            delete data.user;
            store.dispatch(addPresence(data))
            break;
        }
    }
}

function handleGwMessage(event: WebSocketEventMap['message']) {
    websocketState.sequenceNumber++;
    const data = JSON.parse(event.data);
    switch (data.op) {
        case GatewayOp.HELLO.valueOf(): {
            sendHeartbeat();
            websocketState.heartbeatInterval = window.setInterval(() => {
                sendHeartbeat();
            }, data.d.heartbeat_interval);
            break;
        }
        case GatewayOp.DISPATCH: {
            handleDispatchMessage(data.t, data.d);
            break;
        }
    }
}

function sendHeartbeat() {
    if (websocketState.sendWebsocketMessage) {
        websocketState.sendWebsocketMessage({"op": GatewayOp.HEARTBEAT, "d": websocketState.sequenceNumber})
    }
}

interface WebsocketState {
    sendWebsocketMessage: SendJsonMessage | null,
    heartbeatInterval: number | null,
    sequenceNumber: number,
}

export const websocketState: WebsocketState = {
    sendWebsocketMessage: null,
    heartbeatInterval: null,
    sequenceNumber: 0,
};

function getIdentifyProperties() {
    let os = "unknown";
    if (navigator.userAgent.indexOf("Win") !== -1)
        os = "Windows";
    else if (navigator.userAgent.indexOf("Linux") !== -1)
        os = "Linux";
    else if (navigator.userAgent.indexOf("Mac") !== -1)
        os = "MacOS";

    return {
        "os": os,
        "browser": "",
        "device": "",
        "system_locale": navigator.language,
        "browser_user_agent": navigator.userAgent,
        "browser_version": "",
        "os_version": "",
        "referrer": "",
        "referring_domain": "",
        "referrer_current": "",
        "referring_domain_current": "",
        "release_channel": "stable",
        "client_build_number": VERSION_NUMBER,
        "client_event_source": null
    }
}

export default function GatewayWebsocket() {
    const token = store.getState().app.token;
    const dispatch = useDispatch();
    const {sendJsonMessage} = useWebSocket(GATEWAY_ENDPOINT+"?encoding=json&v=9", {
        onOpen: () => {
            websocketState.sendWebsocketMessage = sendJsonMessage;
            websocketState.sequenceNumber = 0;
            sendJsonMessage({
                "op": GatewayOp.IDENTIFY,
                "d": {
                    "token": token,
                    "capabilities": 4093,
                    "properties": getIdentifyProperties(),
                    "presence": {
                        "status": "unknown",
                        "since": 0,
                        "activities": [],
                        "afk": false
                    },
                    "compress": false,
                    "client_state": {
                        "guild_versions": {},
                        "highest_last_message_id": "0",
                        "read_state_version": 0,
                        "user_guild_settings_version": -1,
                        "user_settings_version": -1,
                        "private_channels_version": "0",
                        "api_code_version": 0
                    }
                }
            })
        },
        onClose: () => dispatch(setWsReady(false)),
        onMessage: handleGwMessage,
        retryOnError: true,
        reconnectAttempts: Number.MAX_VALUE,
        reconnectInterval: (attemptNumber) => Math.min(Math.pow(attemptNumber, 2) * 1000, 32000),
    });

    return <></>;
}