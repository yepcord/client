import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {FormEvent, useState} from "react";
import ApiClient, {ErrorResponse} from "../../api/client";
import {setToken} from "../../states/app";
import {isEmpty} from "./AuthPage";

interface LoginErrors {
    email?: string,
    password?: string,
}

export default function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({} as LoginErrors);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors({});

        ApiClient
            .login(email, password)
            .then(r => {
                if (r.body === null) {
                    setErrors({"email": "Server error, try again.", "password": "Server error, try again."})
                    return;
                }
                if ("token" in r.body) {
                    dispatch(setToken(r.body.token));
                    navigate("/app");
                    return;
                }
                if ("ticket" in r.body) {
                    // TODO: handle mfa
                    return;
                }

                if (r.status >= 400 && r.status < 500) {
                    const resp_errors = (r.body as ErrorResponse).errors;
                    const errors: LoginErrors = {};
                    if ("login" in resp_errors) {
                        errors["email"] = resp_errors["login"]["_errors"][0]["message"];
                    }
                    if ("password" in resp_errors) {
                        errors["password"] = resp_errors["password"]["_errors"][0]["message"];
                    }
                    setErrors(errors);
                }
            });
    };

    const loginErr = () => errors.email ? " - " + errors.email : null;
    const passwordErr = () => errors.password ? " - " + errors.password : null;

    return (
        <form className="login-form-container" onSubmit={submit}>
            <div className="login-form">
                <div className="login-form-header">
                    <h3>Welcome to YEPCord</h3>
                    <p>Log in</p>
                </div>
                <div className="input-container">
                    <label style={{color: !isEmpty(errors) ? "red" : ""}}>
                        Email or phone number
                        <span className="required-asterisk">{loginErr() ? loginErr() : " *"}</span>
                    </label>
                    <input name="email" type="email" className="input-primary" onChange={e => setEmail(e.target.value)}
                           required={true}/>
                </div>
                <div className="input-container">
                    <label style={{color: !isEmpty(errors) ? "red" : ""}}>
                        Password
                        <span className="required-asterisk">{passwordErr() ? passwordErr() : " *"}</span>
                    </label>
                    <input name="password" type="password" className="input-primary"
                           onChange={e => setPassword(e.target.value)} required={true}/>
                    <a href="#" className="form-link">Forgot your password?</a>
                </div>
                <button className="btn-primary-wide">Log in</button>
                <p>
                    Need an account? <a onClick={() => navigate("/register")} className="form-link">Register</a>
                </p>
            </div>
            <div className="remote-auth-form">
                <img className="remote-auth-qr" src="/no-image.png"/>
                <h3>Log in with QR Code</h3>
                <p>Scan this with mobile app to log in instantly.</p>
            </div>
        </form>
    );
}