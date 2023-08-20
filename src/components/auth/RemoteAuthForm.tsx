import {useSelector} from "react-redux";
import {RootState} from "../../store";
import QRCode from "react-qr-code";
import {PUBLIC_URL} from "../../constants";
import RemoteAuthAvatar from "./RemoteAuthAvatar";
import {ra_websocketState} from "../../ws/remote_auth/RemoteAuthWebsocket";

export function RemoteAuthFormNoQr() {
    return (<>
        <img className="remote-auth-qr" src="/no-image.png" alt="Remote auth qr code"/>
        <h3>Log in with QR Code</h3>
        <p>Scan this with mobile app to log in instantly.</p>
    </>);
}

export function RemoteAuthFormQr() {
    const fingerprint = useSelector((state: RootState) => state.remote_auth.fingerprint);

    return (<>
        <QRCode className="remote-auth-qr" value={`${PUBLIC_URL}/ra/${fingerprint}`}/>
        <h3>Log in with QR Code</h3>
        <p>Scan this with mobile app to log in instantly.</p>
    </>);
}

export function RemoteAuthFormUser() {
    const userdata = useSelector((state: RootState) => state.remote_auth.userdata);

    return (<>
        <RemoteAuthAvatar id={userdata!.id} avatar={userdata!.avatar}/>
        <h3>Check your phone!</h3>
        <p>Logging in as {userdata!.username}#{userdata!.discriminator}</p>
        <a onClick={() => ra_websocketState.getWs && ra_websocketState.getWs()?.close()} className="form-link">Not me, start over</a>
    </>);
}

export default function RemoteAuthForm() {
    const fingerprint = useSelector((state: RootState) => state.remote_auth.fingerprint);
    const userdata = useSelector((state: RootState) => state.remote_auth.userdata);

    let element = <RemoteAuthFormNoQr/>;
    if (fingerprint)
        element = <RemoteAuthFormQr/>;
    if (userdata)
        element = <RemoteAuthFormUser/>;

    return (
        <div className="remote-auth-form">
            {element}
        </div>
    );
}