import useWebSocket from "react-use-websocket";
import {REMOTE_AUTH_ENDPOINT} from "../../constants";
import {SendJsonMessage, WebSocketLike} from "react-use-websocket/src/lib/types";
import store from "../../store";
import {setFingerprint, setUserdata} from "../../states/remote_auth";
import {setToken} from "../../states/app";


function sendHeartbeat() {
    if (ra_websocketState.sendWebsocketMessage) {
        ra_websocketState.sendWebsocketMessage({"op": "heartbeat"})
    }
}

function handleGwMessage(event: WebSocketEventMap['message']) {
    const data = JSON.parse(event.data);
    switch(data.op) {
        case "hello": {
            ra_websocketState.heartbeatInterval = window.setInterval(() => {sendHeartbeat()}, data.heartbeat_interval);
            break;
        }
        case "nonce_proof": {
            let nonce = Uint8Array.from(atob(data.encrypted_nonce), c => c.charCodeAt(0));
            window.crypto.subtle.decrypt({name: "RSA-OAEP"}, ra_websocketState.keyPair!.privateKey, nonce).then(async (res) => {
                const hash = await window.crypto.subtle.digest({name: "SHA-256"}, res);
                ra_websocketState.sendWebsocketMessage!({
                    "op": "nonce_proof",
                    "proof": btoa(new Uint8Array(hash).reduce((acc, current) => acc + String.fromCharCode(current), "")),
                })
            });
            break;
        }
        case "pending_remote_init": {
            store.dispatch(setFingerprint(data.fingerprint));
            break;
        }
        case "pending_finish": {
            let encrypted_user = Uint8Array.from(atob(data.encrypted_user_payload), c => c.charCodeAt(0));
            window.crypto.subtle.decrypt({name: "RSA-OAEP"}, ra_websocketState.keyPair!.privateKey, encrypted_user).then((res) => {
                const userdata = new TextDecoder("utf8").decode(res).split(":");
                store.dispatch(setUserdata({
                    id: userdata[0],
                    username: userdata[3],
                    discriminator: userdata[1],
                    avatar: userdata[2] ? userdata[2] : null,
                }));
            });
            break;
        }
        case "finish": {
            ra_websocketState.finish = true;
            let encrypted_token = Uint8Array.from(atob(data.encrypted_token), c => c.charCodeAt(0));
            window.crypto.subtle.decrypt({name: "RSA-OAEP"}, ra_websocketState.keyPair!.privateKey, encrypted_token).then((res) => {
                const token = new TextDecoder("utf8").decode(res);
                store.dispatch(setToken(token));
            });
            break;
        }
        case "cancel": {
            store.dispatch(setFingerprint(null));
            store.dispatch(setUserdata(null));
            ra_websocketState.getWs && ra_websocketState.getWs()?.close()
            break;
        }
    }
}

interface RAWebsocketState {
    sendWebsocketMessage: SendJsonMessage | null,
    heartbeatInterval: number | null,
    keyPair: CryptoKeyPair | null,
    finish: boolean,
    getWs: (() => WebSocketLike | null) | null,
}

export const ra_websocketState: RAWebsocketState = {
    sendWebsocketMessage: null,
    heartbeatInterval: null,
    keyPair: null,
    finish: false,
    getWs: null,
};

export default function RemoteAuthWebsocket() {
    const {sendJsonMessage, getWebSocket} = useWebSocket(REMOTE_AUTH_ENDPOINT + "?v=1", {
        onOpen: () => {
            store.dispatch(setFingerprint(null));
            store.dispatch(setUserdata(null));
            ra_websocketState.sendWebsocketMessage = sendJsonMessage;

            window.crypto.subtle.generateKey(
                {
                    name: "RSA-OAEP",
                    modulusLength: 2048,
                    publicExponent: new Uint8Array([1, 0, 1]),
                    hash: "SHA-256"
                },
                true,
                ["encrypt", "decrypt"]
            ).then((keyPair) => {
                ra_websocketState.keyPair = keyPair;
                window.crypto.subtle.exportKey("spki", keyPair.publicKey).then(pubKeyBuf => {
                    sendJsonMessage({
                        "op": "init",
                        "encoded_public_key": btoa(new Uint8Array(pubKeyBuf).reduce((acc, current) => acc + String.fromCharCode(current), "")),
                    });
                });
            });
        },
        shouldReconnect: () => !ra_websocketState.finish,
        onMessage: handleGwMessage,
        retryOnError: true,
        reconnectAttempts: Number.MAX_VALUE,
        reconnectInterval: (attemptNumber) => Math.min(Math.pow(attemptNumber, 2) * 1000, 4),
    });
    ra_websocketState.getWs = getWebSocket;

    return <></>;
}