import {DialogProps} from "./index";
import {Divider} from "@mui/material";
import React, {useState} from "react";
import ApiClient, {ErrorResponse} from "../../../../../api/client";
import TransparentSecondaryButton from "../../../../ui/TransparentSecondaryButton";
import PrimaryButton from "../../../../ui/PrimaryButton";
import {setToken} from "../../../../../states/app";
import {useDispatch} from "react-redux";

export default function DisableMfaDialog({close}: DialogProps) {
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
        ApiClient.disableMfa(code).then(resp => {
            setLoading(false);
            if (resp.body === null || resp.status >= 500) {
                setError("Server error, try again.");
                return;
            } else if (resp.status >= 400 && resp.status <= 499) {
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

    return (
        <div className="edit-settings-dialog">
            <div className="center">
                <h2 className="text-main">Disable Two-Factor Auth</h2>
            </div>

            <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

            <div className="input-container">
                <label style={{color: codeErr() ? "red" : ""}} className="text-primary">
                    Enter auth/backup code
                    <span className="required-asterisk">{codeErr()}</span>
                </label>
                <input name="code" type="text" className="input-primary" onChange={handleInput}
                       required={true} disabled={loading} value={code} placeholder="6-digit auth code / 8-digit backup code"/>
            </div>

            <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

            <div className="edit-settings-dialog-bottom-buttons">
                <TransparentSecondaryButton onClick={close} disabled={loading}>Cancel</TransparentSecondaryButton>
                <PrimaryButton onClick={handleSubmit} disabled={loading}>Remove 2FA</PrimaryButton>
            </div>
        </div>
    )
}