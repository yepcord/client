import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {FormEvent, useState} from "react";
import ApiClient, {ErrorResponse} from "../../api/client";
import {setToken} from "../../states/app";
import {isEmpty} from "./AuthPage";
import PrimaryButton from "../ui/PrimaryButton";

interface RegisterErrors {
    email?: string,
    password?: string,
    username?: string,
    date_of_birth?: string
}

export default function RegisterForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [birth, setBirth] = useState("2000-01-01");
    const [errors, setErrors] = useState({} as RegisterErrors);

    const days = [];
    const years = [];
    for (let i = 1; i <= 31; i++) {
        days.push(i);
    }
    for (let i = new Date().getFullYear(); i >= 1900; i--) {
        years.push(i);
    }

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors({});

        ApiClient
            .register(email, password, username, birth)
            .then(r => {
                if (r.body === null) {
                    setErrors({
                        "email": "Server error, try again.", "password": "Server error, try again.",
                        "username": "Server error, try again.", "date_of_birth": "Server error, try again."
                    })
                    return;
                }
                if ("token" in r.body) {
                    dispatch(setToken(r.body.token));
                    navigate("/app");
                    return;
                }

                if (r.status >= 400 && r.status < 500) {
                    const resp_errors = (r.body as ErrorResponse).errors!;
                    const errors: RegisterErrors = {};
                    if ("email" in resp_errors)
                        errors["email"] = resp_errors["email"]["_errors"][0]["message"];
                    if ("password" in resp_errors)
                        errors["password"] = resp_errors["password"]["_errors"][0]["message"];
                    if ("username" in resp_errors)
                        errors["username"] = resp_errors["username"]["_errors"][0]["message"];
                    if ("date_of_birth" in resp_errors)
                        errors["date_of_birth"] = resp_errors["date_of_birth"]["_errors"][0]["message"];

                    setErrors(errors);
                }
            });
    };

    const _padDate = (num: string) => ("0" + num).slice(-2);
    const setDateOfBirth = ({day, month, year}: { day?: string, month?: string, year?: string }) => {
        let b = birth.split("-");
        if (year)
            b[0] = year;
        if (month)
            b[1] = _padDate(month);
        if (day)
            b[2] = _padDate(day);
        setBirth(b.join("-"));
    }

    const emailErr = () => errors.email ? " - " + errors.email : null;
    const passwordErr = () => errors.password ? " - " + errors.password : null;
    const usernameErr = () => errors.username ? " - " + errors.username : null;
    const birthErr = () => errors.date_of_birth ? " - " + errors.date_of_birth : null;

    return (
        <form className="register-form-container" onSubmit={submit}>
            <div className="register-form">
                <h2>Create an account</h2>
                <div className="input-container">
                    <label style={{color: !isEmpty(errors) ? "red" : ""}}>
                        Email
                        <span className="required-asterisk">{emailErr() ? emailErr() : " *"}</span></label>
                    <input name="email" type="email" className="input-primary" onChange={e => setEmail(e.target.value)}
                           required={true}/>
                </div>
                <div className="input-container">
                    <label style={{color: !isEmpty(errors) ? "red" : ""}}>
                        Username
                        <span className="required-asterisk">{usernameErr() ? usernameErr() : " *"}</span></label>
                    <input name="text" type="username" className="input-primary"
                           onChange={e => setUsername(e.target.value)} required={true}/>
                </div>
                <div className="input-container">
                    <label style={{color: !isEmpty(errors) ? "red" : ""}}>
                        Password
                        <span className="required-asterisk">{passwordErr() ? passwordErr() : " *"}</span></label>
                    <input name="password" type="password" className="input-primary"
                           onChange={e => setPassword(e.target.value)} required={true}/>
                </div>
                <div className="input-container">
                    <label style={{color: !isEmpty(errors) ? "red" : ""}}>
                        Date of birth
                        <span className="required-asterisk">{birthErr() ? birthErr() : " *"}</span></label>
                    <div className="date-of-birth-container">
                        <select name="birth-month" className="input-primary" required={true}
                                onChange={e => setDateOfBirth({month: e.target.value})}>
                            <option value="" disabled selected>Month</option>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                        <select name="birth-day" className="input-primary" required={true}
                                onChange={e => setDateOfBirth({day: e.target.value})}>
                            <option value="" disabled selected>Day</option>
                            {days.map((item) => {
                                return <option value={item.toString()}>{item}</option>
                            })}
                        </select>
                        <select name="birth-year" className="input-primary" required={true}
                                onChange={e => setDateOfBirth({year: e.target.value})}>
                            <option value="" disabled selected>Year</option>
                            {years.map((item) => {
                                return <option value={item.toString()}>{item}</option>
                            })}
                        </select>
                    </div>
                </div>
                <PrimaryButton type="submit" wide={true}>Continue</PrimaryButton>
                <p>
                    Already have an account? <a onClick={() => navigate("/login")} className="form-link">Login</a>
                </p>
            </div>
        </form>
    );
}