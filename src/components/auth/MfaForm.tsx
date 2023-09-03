import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import React, {FormEvent, useState} from "react";
import ApiClient, {ErrorResponse} from "../../api/client";
import {setToken} from "../../states/app";
import PrimaryButton from "../ui/PrimaryButton";

export default function MfaForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const ticket = new URLSearchParams(window.location.search).get("ticket");
    if(!ticket) navigate("/login");

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
        setError("");
    }

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        ApiClient
            .loginMfa(code, ticket!)
            .then(resp => {
                if (resp.body === null || resp.status >= 500) {
                    setError("Server error, try again.")
                    return;
                }
                if ("token" in resp.body) {
                    dispatch(setToken(resp.body.token));
                    navigate("/app");
                    return;
                }

                if (resp.status >= 400 && resp.status < 500) {
                    const resp_error = resp.body as ErrorResponse;
                    setError(resp_error.message);
                    return
                }
            });
    };

    const codeErr = () => error ? " - " + error : null;

    return (<>
        <form className="mfa-form-container" onSubmit={submit}>
            <div className="mfa-form">
                <div className="login-form-header">
                    <h3>Two-factor authentication</h3>
                    <p>You can use a backup code or your two-factor authentication mobile app</p>
                </div>
                <div className="input-container">
                    <label style={{color: error ? "red" : ""}}>
                        Auth/Backup Code
                        <span className="required-asterisk">{codeErr() ? codeErr() : " *"}</span></label>
                    <input name="code" type="text" className="input-primary" onChange={handleInput} required={true}
                           placeholder="6-digit auth code / 8-digit backup code"/>
                </div>
                <PrimaryButton type="submit" wide={true} className="btn-center">Log in</PrimaryButton>
                <a onClick={() => navigate("/login")} className="form-link">Go Back to Login</a>
            </div>
        </form>
    </>);
}