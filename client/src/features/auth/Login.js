import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Login.css';
import Loader from '../../components/loader/Loader';
import { login, googleLogin, selectLoggingIn, selectLoginError, selectGoogleLoggingIn, selectGoogleLoginError } from './authSlice';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const loggingIn = useSelector(selectLoggingIn);
    const loginError = useSelector(selectLoginError);
    const googleLoggingIn = useSelector(selectGoogleLoggingIn);
    const googleLoginError = useSelector(selectGoogleLoginError);

    const handleChange = ({ target }) => {
        if (target.name === "username") {
            setUsername(target.value);
        }
        else if (target.name === "password") {
            setPassword(target.value);
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target.id === 'loginButton') {
            dispatch(login({ username, password }));
        }
        else if (e.target.id === 'googleLoginButton') {
            dispatch(googleLogin());
        }
    };

    if (loggingIn || googleLoggingIn) {
        return (
            <section className="Login">
                <Loader />
            </section>
        );
    }
    if (loginError || googleLoginError) {
        return (
            <section className="Login">
                <p className="Login__error">An unexpected error has occurred.</p>
            </section>
        );
    }
    return (
        <section className="Login">
            <h2 className="Login__title">User Login</h2>
            <form className="Login__form" method="post" action="">
                <label className="Login__label" for="username">USERNAME</label>
                <input className="Login__input" id="username" name="username" placeholder="Username" required
                value={username} onChange={handleChange}/>
                <label className="Login__label" for="password">PASSWORD</label>
                <input className="Login__input" id="password" name="password" placeholder="Enter a valid password" type="password" required
                value={password} onChange={handleChange}/>
                <input id='loginButton' className="Login__button" type="submit" value="LOGIN" onClick={handleClick}/>
                <button id='googleLoginButton' className="Login__google__button" onClick={handleClick}>GOOGLE LOGIN</button>
            </form>
            <p className="Login__registerLink">New user? Please Register.</p>
        </section>
    );
}

export default Login;