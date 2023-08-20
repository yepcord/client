import {websocketState} from "../../GatewayWebsocket";
import {GatewayOp} from "../../../../types/gateway";

export interface HelloHandlerData {
    heartbeat_interval: number,
}

function sendHeartbeat() {
    if (websocketState.sendWebsocketMessage) {
        websocketState.sendWebsocketMessage({"op": GatewayOp.HEARTBEAT, "d": websocketState.sequenceNumber})
    }
}

export default function helloHandler(data: HelloHandlerData) {
    sendHeartbeat();
    websocketState.heartbeatInterval = window.setInterval(() => {
        sendHeartbeat();
    }, data.heartbeat_interval);
}