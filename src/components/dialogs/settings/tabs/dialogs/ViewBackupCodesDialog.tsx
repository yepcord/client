import {DialogProps} from "./index";
import {BackupCode, BackupCodeNonces} from "../AccountTab";
import React, {useEffect, useState} from "react";
import ApiClient, {ErrorResponse} from "../../../../../api/client";
import TransparentSecondaryButton from "../../../../ui/TransparentSecondaryButton";
import PrimaryButton from "../../../../ui/PrimaryButton";
import {Divider} from "@mui/material";

interface ViewBackupCodesDialogProps extends DialogProps {
    setBackupCodes: (arg0: BackupCode[]) => void,
    setNonces: (arg0: BackupCodeNonces | null) => void,
    setKey: (arg0: string | null) => void,
}

interface PasswordDialogProps extends DialogProps {
    returnNonces: (arg0: BackupCodeNonces | null) => void,
}

interface VerificationDialogProps extends DialogProps {
    setBackupCodes: (arg0: BackupCode[]) => void,
    returnKey: (arg0: string | null) => void,
    nonce: string,
}

function PasswordDialog({returnNonces, close}: PasswordDialogProps) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setError("");
    }

    const handleSubmit = () => {
        setLoading(true);
        ApiClient.viewBackupCodesChallenge(password).then(resp => {
            setLoading(false);
            if (resp.body === null || resp.status >= 500) {
                setError("Server error, try again.");
                return;
            }
            if (resp.status >= 400 && resp.status <= 499) {
                const resp_error = resp.body as ErrorResponse;
                setError(resp_error.message)
            }
            if(resp.status === 200) {
                const body = resp.body as {nonce: string, regenerate_nonce: string};
                returnNonces({nonce: body.nonce, regenerate_nonce: body.regenerate_nonce});
                return;
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
            <PrimaryButton onClick={handleSubmit} disabled={loading}>Next</PrimaryButton>
        </div>
    </>);
}

function VerificationDialog({setBackupCodes, returnKey, nonce, close}: VerificationDialogProps) {
    const [key, setKey] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKey(e.target.value);
        setError("");
    }

    const handleSubmit = () => {
        setLoading(true);
        ApiClient.viewBackupCodes(key, nonce).then(resp => {
            setLoading(false);
            if (resp.body === null || resp.status >= 500) {
                setError("Server error, try again.");
                return;
            }
            if (resp.status >= 400 && resp.status <= 499) {
                const resp_error = resp.body as ErrorResponse;
                setError(resp_error.message);
            }
            if(resp.status === 200) {
                const body = resp.body as {backup_codes: BackupCode[]}
                setBackupCodes(body.backup_codes);
                returnKey(key);
                close();
                return;
            }
        });
    }

    const keyErr = () => error ? " - " + error : null;

    return (<>
        <div className="input-container">
            <label style={{color: keyErr() ? "red" : ""}} className="text-primary">
                Verification Key
                <span className="required-asterisk">{keyErr()}</span>
            </label>
            <input name="key" type="text" className="input-primary" onChange={handleInput}
                   required={true} disabled={loading} value={key}/>
        </div>

        <div className="edit-settings-dialog-bottom-buttons">
            <TransparentSecondaryButton onClick={close} disabled={loading}>Cancel</TransparentSecondaryButton>
            <PrimaryButton onClick={handleSubmit} disabled={loading}>Submit</PrimaryButton>
        </div>
    </>);
}

export default function ViewBackupCodesDialog({close, setBackupCodes, setKey, setNonces}: ViewBackupCodesDialogProps) {
    const [nonces, _setNonces] = useState<BackupCodeNonces | null>(null);

    useEffect(() => {
        setNonces(nonces);
    }, [nonces]);

    return (
        <div className="edit-settings-dialog">
            <div className="center">
                <h2 className="text-main">View Backup Codes</h2>
                {nonces && <span className="text-secondary">Enter the key we just sent to your email address.</span>}
            </div>

            <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

            {nonces
                ? <VerificationDialog setBackupCodes={setBackupCodes} close={close} nonce={nonces.nonce} returnKey={setKey}/>
                : <PasswordDialog returnNonces={_setNonces} close={close}/>}
        </div>
    );
}