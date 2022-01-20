import React from 'react';
import './Login.css';

const Login = () => {
    return (
        <section className="Login">
            <h2 className="Login__title">User Login</h2>
            <form className="Login__form" method="post" action="/auth/login">
                <label className="Login__label" for="username">USERNAME</label>
                <input className="Login__input" id="username" name="username" placeholder="Username" required />
                <label className="Login__label" for="password">PASSWORD</label>
                <input className="Login__input" id="password" name="password" placeholder="Enter a valid password" type="password" required />
                <input className="Login__button" type="submit" value="LOGIN" />
                <button className="Login__google__button">GOOGLE LOGIN</button>
            </form>
            <p className="Login__registerLink">New user? Please Register.</p>
        </section>
    );
}

export default Login;