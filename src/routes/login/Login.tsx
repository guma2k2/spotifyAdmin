import React, { useContext, useState } from 'react';
import './Login.style.scss'
import { login } from '../../services/AuthService';
import { LoginRequest } from '../../types/LoginType';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const Login = () => {
    const { state, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(state);
    const [inputs, setInputs] = useState<LoginRequest>({
        email: "",
        password: ""
    });
    const [err, setErr] = useState<string>();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const res = await login(inputs).catch(err => {
            console.log(err);
            console.log(err.response.data.message);
            setErr(err.response.data.message);
        });
        console.log(res);
        if (res && res.status === 200) {
            const user = res.data.user;
            const cookies = new Cookies();


            if (user.role.name === "ROLE_ADMIN") {
                cookies.set('refresh_token', res.data.refresh_token, { path: '/' });
                localStorage.setItem("access_token", res.data.access_token)
                dispatch({ type: "LOGIN", payload: res.data.user });
                navigate('/')
            } else {
                setErr("You don't have permission")
            }
        }
    }
    return (
        <div className="auth">
            <h1>Login</h1>
            <form>
                <input
                    required
                    type="email"
                    placeholder="email"
                    name="email"
                    onChange={handleChange}
                />
                <input
                    required
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Login</button>
                {err && <p>{err}</p>}
            </form>
        </div>
    );
};

export default Login;