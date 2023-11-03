import QRCode from "react-qr-code";
import {PUBLIC_URL} from "../../constants";
import RemoteAuthAvatar from "./RemoteAuthAvatar";
import {fingerprint, ra_websocketState, userdata} from "../../ws/remote_auth/RemoteAuthWebsocket";

export function RemoteAuthFormNoQr() {
    return (<>
        <img className="remote-auth-qr" src="/no-image.png" alt="Remote auth qr code"/>
        <h3>Log in with QR Code</h3>
        <p>Scan this with mobile app to log in instantly.</p>
    </>);
}

export function RemoteAuthFormQr() {
    return (<>
        <QRCode className="remote-auth-qr" value={`${PUBLIC_URL}/ra/${fingerprint.value}`}/>
        <h3>Log in with QR Code</h3>
        <p>Scan this with mobile app to log in instantly.</p>
    </>);
}

export function RemoteAuthFormUser() {
    return (<>
        <RemoteAuthAvatar id={userdata.value!.id} avatar={userdata.value!.avatar}/>
        <h3>Check your phone!</h3>
        <p>Logging in as {userdata.value!.username}#{userdata.value!!.discriminator}</p>
        <a href="#/cancel" onClick={() => ra_websocketState.getWs && ra_websocketState.getWs()?.close()} className="form-link">Not me, start over</a>
    </>);
}

export default function RemoteAuthForm() {
    let element = <RemoteAuthFormNoQr/>;
    if (fingerprint.value)
        element = <RemoteAuthFormQr/>;
    if (userdata.value)
        element = <RemoteAuthFormUser/>;

    return (
        <div className="remote-auth-form">
            {element}
        </div>
    );
}