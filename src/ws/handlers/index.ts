import {GatewayOp} from "../../types/gateway";
import helloHandler, {HelloHandlerData} from "./hello/hello";
import readyHandler, {ReadyHandlerData} from "./dispatch/ready";
import readySupplementalHandler, {ReadySupplementalHandlerData} from "./dispatch/ready_supplemental";
import presenceUpdateHandler, {PresenceUpdateHandlerData} from "./dispatch/presence_update";

type DispatchData = ReadyHandlerData | ReadySupplementalHandlerData | PresenceUpdateHandlerData;

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