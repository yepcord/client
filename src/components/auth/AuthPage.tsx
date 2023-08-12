import '../../styles/auth.css';
import '../../styles/main.css';
import {useNavigate} from "react-router-dom";
import { FormEvent } from 'react';

interface AuthPageProps {
    page: "login" | "register",
}

function LoginForm() {
    const navigate = useNavigate();

    return (
        <form className="login-form-container">
            <div className="login-form">
                <div className="login-form-header">
                    <h3>Welcome to YEPCord</h3>
                    <p>Log in</p>
                </div>
                <div className="input-container">
                    <label>Email or phone number <span className="required-asterisk">*</span></label>
                    <input name="email" type="email" className="input-primary"/>
                </div>
                <div className="input-container">
                    <label>Password <span className="required-asterisk">*</span></label>
                    <input name="password" type="password" className="input-primary"/>
                    <a href="#" className="form-link">Forgot your password?</a>
                </div>
                <button className="btn-primary-wide">Log in</button>
                <p>
                    Need an account? <a onClick={() => navigate("/register")} className="form-link">Register</a>
                </p>
            </div>
            <div className="remote-auth-form">
                <img className="remote-auth-qr" src="/logo192.png"/>
                <h3>Log in with QR Code</h3>
                <p>Scan this with mobile app to log in instantly.</p>
            </div>
        </form>
    );
}

function RegisterForm() {
    const navigate = useNavigate();
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
        //console.log("Email: "+event.target.email.value)
    };

    return (
        <form className="register-form-container" onSubmit={submit}>
            <div className="register-form">
                <h2>Create an account</h2>
                <div className="input-container">
                    <label>Email <span className="required-asterisk">*</span></label>
                    <input name="email" type="email" className="input-primary" required={true}/>
                </div>
                <div className="input-container">
                    <label>Username <span className="required-asterisk">*</span></label>
                    <input name="text" type="username" className="input-primary" required={true}/>
                </div>
                <div className="input-container">
                    <label>Password <span className="required-asterisk">*</span></label>
                    <input name="password" type="password" className="input-primary" required={true}/>
                </div>
                <div className="input-container">
                    <label>Date of birth <span className="required-asterisk">*</span></label>
                    <div className="date-of-birth-container">
                        <select name="birth-month" className="input-primary" required={true}>
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
                        <select name="birth-day" className="input-primary" required={true}>
                            <option value="" disabled selected>Day</option>
                            {days.map((item) => {
                                return <option value={item.toString()}>{item}</option>
                            })}
                        </select>
                        <select name="birth-year" className="input-primary" required={true}>
                            <option value="" disabled selected>Year</option>
                            {years.map((item) => {
                                return <option value={item.toString()}>{item}</option>
                            })}
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn-primary-wide">Continue</button>
                <p>
                    Already have an account? <a onClick={() => navigate("/login")} className="form-link">Login</a>
                </p>
            </div>
        </form>
    );
}

export default function AuthPage({page}: AuthPageProps) {
    const AuthForm = page === "login" ? LoginForm : RegisterForm;

    return (
        <div className="auth-container">
            <AuthForm/>
        </div>
    );
}