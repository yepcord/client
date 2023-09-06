import {useDispatch} from "react-redux";
import useWebSocket from "react-use-websocket";
import {GATEWAY_ENDPOINT, VERSION_NUMBER} from "../../constants";
import {setToken, setWsReady} from "../../states/app";
import {SendJsonMessage} from "react-use-websocket/src/lib/types";
import {GatewayOp} from "../../types/gateway";
import store from "../../store";
import handleGatewayMessage from "./handlers";


function handleGwMessage(event: WebSocketEventMap['message']) {
    websocketState.sequenceNumber++;
    const data = JSON.parse(event.data);
    handleGatewayMessage(data);
}

interface WebsocketState {
    sendWebsocketMessage: SendJsonMessage | null,
    heartbeatInterval: number | null,
    sequenceNumber: number,
    deferedWsNotReadyTimeout: number | null,
}

export const websocketState: WebsocketState = {
    sendWebsocketMessage: null,
    heartbeatInterval: null,
    sequenceNumber: 0,
    deferedWsNotReadyTimeout: null,
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
    const {sendJsonMessage} = useWebSocket(GATEWAY_ENDPOINT + "?encoding=json&v=9", {
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
        onClose: () => {
            if(websocketState.deferedWsNotReadyTimeout !== null) return;
            websocketState.deferedWsNotReadyTimeout = window.setTimeout(() => {
                dispatch(setWsReady(false));
            }, 10000)
        },
        shouldReconnect: (e) => {
            if(e.code === 4004) {
                dispatch(setToken(null));
                return false;
            }
            return true;
        },
        onMessage: handleGwMessage,
        retryOnError: true,
        reconnectAttempts: Number.MAX_VALUE,
        reconnectInterval: (attemptNumber) => Math.min(Math.pow(attemptNumber, 2) * 1000, 16000),
    });

    return <></>;
}