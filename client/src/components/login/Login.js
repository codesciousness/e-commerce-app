import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Login.css';
import Loader from '../loader/Loader';
import { login, googleLogin, selectLoggingIn, selectLoginSuccess, selectLoginError, selectGoogleLoggingIn, 
        selectGoogleLoginSuccess, selectGoogleLoginError, clearUsersStatusUpdates } from '../../features/users/usersSlice';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const loggingIn = useSelector(selectLoggingIn);
    const loginSuccess = useSelector(selectLoginSuccess);
    const loginError = useSelector(selectLoginError);
    const googleLoggingIn = useSelector(selectGoogleLoggingIn);
    const googleLoginSuccess = useSelector(selectGoogleLoginSuccess);
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

    useEffect(() => {
        if (loginSuccess || googleLoginSuccess) {
            setUsername('');
            setPassword('');
        }
        if (loginSuccess || loginError || googleLoginSuccess || googleLoginError) {
            dispatch(clearUsersStatusUpdates());
        }
    }, [loginSuccess, loginError, googleLoginSuccess, googleLoginError, dispatch]);

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