import '../../styles/auth.css';
import '../../styles/main.css';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import MfaForm from "./MfaForm";

interface AuthPageProps {
    page: "login" | "register" | "mfa",
}

export const isEmpty = (obj: object): boolean => {
    return Object.keys(obj).length === 0;
}

const forms = {
    login: LoginForm,
    register: RegisterForm,
    mfa: MfaForm,
}

export default function AuthPage({page}: AuthPageProps) {
    const AuthForm = forms[page];

    return (
        <div className="auth-container">
            <AuthForm/>
        </div>
    );
}

export function LoginPage() {
    return <AuthPage page="login"/>
}

export function RegisterPage() {
    return <AuthPage page="register"/>
}

export function MfaPage() {
    return <AuthPage page="mfa"/>
}
