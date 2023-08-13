import '../../styles/auth.css';
import '../../styles/main.css';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface AuthPageProps {
    page: "login" | "register",
}

export const isEmpty = (obj: object): boolean => {
    return Object.keys(obj).length === 0;
}

export default function AuthPage({page}: AuthPageProps) {
    const AuthForm = page === "login" ? LoginForm : RegisterForm;

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
