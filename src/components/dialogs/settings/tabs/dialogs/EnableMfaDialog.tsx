import {DialogProps} from "./index";
import {Divider} from "@mui/material";
import TransparentSecondaryButton from "../../../../ui/TransparentSecondaryButton";
import PrimaryButton from "../../../../ui/PrimaryButton";
import React, {useState} from "react";
import ApiClient, {ErrorResponse} from "../../../../../api/client";
import {INSTANCE_NAME, PUBLIC_URL} from "../../../../../constants";
import QRCode from "react-qr-code";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../store";
import {setToken} from "../../../../../states/app";

interface PasswordDialogProps extends DialogProps{
    returnPassword: (arg0: string) => void,
}

interface VerifyCodeDialogProps extends DialogProps {
    password: string,
    secret: string,
}

function PasswordDialog({returnPassword, close}: PasswordDialogProps) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setError("");
    }

    const handleSubmit = () => {
        setLoading(true);
        ApiClient.enableMfa({password: password}).then(resp => {
            setLoading(false);
            if (resp.body === null || resp.status >= 500) {
                setError("Server error, try again.");
                return;
            }
            if (resp.status >= 400 && resp.status <= 499) {
                const resp_error = resp.body as ErrorResponse;
                if(resp_error.code === 50018)
                    setError(resp_error.message)
                else if(resp.status === 400)
                    returnPassword(password);
            }
        });
    }

    const passwordErr = () => error ? " - " + error : null;

    return (<>
        <div className="input-container">
            <label style={{color: passwordErr() ? "red" : ""}} className="text-primary">
                Password
                <span className="required-asterisk">{passwordErr()}</span>
            </label>
            <input name="password" type="password" className="input-primary" onChange={handleInput}
                   required={true} disabled={loading} value={password}/>
        </div>

        <div className="edit-settings-dialog-bottom-buttons">
            <TransparentSecondaryButton onClick={close} disabled={loading}>Cancel</TransparentSecondaryButton>
            <PrimaryButton onClick={handleSubmit} disabled={loading}>Continue</PrimaryButton>
        </div>
    </>);
}

function VerifyCodeDialog({password, secret, close}: VerifyCodeDialogProps) {
    const me = useSelector((state: RootState) => state.app.me);
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
        setError("");
    }

    const handleSubmit = () => {
        setLoading(true);
        ApiClient.enableMfa({password: password, secret: secret, code: code}).then(resp => {
            setLoading(false);
            if (resp.body === null || resp.status >= 500) {
                setError("Server error, try again.");
                return;
            }
            if (resp.status >= 400 && resp.status <= 499) {
                const resp_error = resp.body as ErrorResponse;
                setError(resp_error.message);
                return;
            }
            if("token" in resp.body) {
                dispatch(setToken(resp.body["token"]));
                close();
            }
        });
    }

    const codeErr = () => error ? " - " + error : null;

    return (<>
        <div className="mfa-enable-step">
            <img src="/assets/g_authenticator.png" alt="Google Authenticator" className="mfa-enable-step-img"/>
            <div className="mfa-enable-step-text">
                <span className="text-primary">Download an authenticator app</span>
                <span className="text-secondary text-14">Download and install Authy or Google Authenticator for your phone or tablet.</span>
            </div>
        </div>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <div className="mfa-enable-step">
            <div className="mfa-enable-step-qr">
                <QRCode size={128} value={`otpauth://totp/${me?.email}?secret=${secret}&issuer=${INSTANCE_NAME}`}/>
            </div>
            <div className="mfa-enable-step-text">
                <span className="text-primary">Scan the qr code</span>
                <span className="text-secondary text-14">Open the authenticator app and scan the image to the left using your phone's camera.</span>

                <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "5px 0"}}/>

                <span className="text-primary">2FA key (manual entry)</span>
                <span className="text-main">{secret.toUpperCase()}</span>
            </div>
        </div>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <div className="input-container">
            <label style={{color: codeErr() ? "red" : ""}} className="text-primary">
                Log in with your code
                <span className="required-asterisk">{codeErr()}</span>
            </label>
            <span className="text-secondary text-14">Enter the 6-digit verification code generated.</span>
            <div className="display-row gap-10">
                <input name="code" type="text" className="input-primary" onChange={handleInput}
                       required={true} maxLength={6} minLength={6} disabled={loading} value={code}
                style={{flexGrow: 1}} placeholder="000 000"/>
                <PrimaryButton onClick={handleSubmit} disabled={loading}>Continue</PrimaryButton>
            </div>
        </div>
    </>);
}

function generateMfaSecret() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    for (let i = 0; i < 16; i++) {
        result += characters.charAt(Math.floor(Math.random() * 32));
    }
    return result;
}

export default function EnableMfaDialog({close}: DialogProps) {
    const [password, setPassword] = useState("");
    const secret = generateMfaSecret();

    // TODO: return backup codes list

    return (
        <div className="edit-settings-dialog">
            <div className="center">
                <h2 className="text-main">Enable Two-Factor Auth</h2>
                {password && <span className="text-secondary">Make your account safer in 3 easy steps</span>}
            </div>

            <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

            {password
                ? <VerifyCodeDialog close={close} password={password} secret={secret}/>
                : <PasswordDialog returnPassword={setPassword} close={close}/>}
        </div>
    );
}