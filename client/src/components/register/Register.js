import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Register.css';
import Loader from '../../components/loader/Loader';
import { googleLogin, selectGoogleLoggingIn, selectGoogleLoginSuccess, selectGoogleLoginError } from '../../features/auth/authSlice';
import { registerUser, selectRegisteringUser, selectRegisterUserSuccess, selectRegisterUserError } from '../../features/users/usersSlice';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const registeringUser = useSelector(selectRegisteringUser);
    const registerUserSuccess = useSelector(selectRegisterUserSuccess);
    const registerUserError = useSelector(selectRegisterUserError);
    const googleLoggingIn = useSelector(selectGoogleLoggingIn);
    const googleLoginSuccess = useSelector(selectGoogleLoginSuccess);
    const googleLoginError = useSelector(selectGoogleLoginError);

    const handleChange = ({ target }) => {
        if (target.name === "firstName") {
            setFirstName(target.value);
        }
        else if (target.name === "lastName") {
            setLastName(target.value);
        }
        else if (target.name === "email") {
            setEmail(target.value);
        }
        else if (target.name === "username") {
            setUsername(target.value);
        }
        else if (target.name === "password") {
            setPassword(target.value);
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target.id === 'registerButton') {
            dispatch(registerUser({ firstName, lastName, email, username, password }));
        }
        else if (e.target.id === 'googleRegisterButton') {
            dispatch(googleLogin());
        }
    };

    useEffect(() => {
        if (registerUserSuccess || googleLoginSuccess) {
            setFirstName('');
            setLastName('');
            setEmail('');
            setUsername('');
            setPassword('');
        }
    }, [registerUserSuccess, googleLoginSuccess]);

    if (registeringUser || googleLoggingIn) {
        return (
            <section className="Register">
                <Loader />
            </section>
        );
    }
    if (registerUserError || googleLoginError) {
        return (
            <section className="Register">
                <p className="Register__error">An unexpected error has occurred.</p>
            </section>
        );
    }
    return (
        <section className="Register">
            <h2 className="Register__title">New User Registration</h2>
            <form className="Register__form" method="post" action="">
                <label className="Register__label" for="firstName">FIRST NAME</label>
                <input className="Register__input" id="firstName" name="firstName" placeholder="First Name" pattern="[A-Za-z]" required
                value={firstName} onChange={handleChange}/>
                <label className="Register__label" for="lastName">LAST NAME</label>
                <input className="Register__input" id="lastName" name="lastName" placeholder="Last Name" pattern="[A-Za-z]" required
                value={lastName} onChange={handleChange}/>
                <label className="Register__label" for="email">EMAIL</label>
                <input className="Register__input" id="email" name="email" placeholder="Enter your email address" type="email" required
                value={email} onChange={handleChange}/>
                <label className="Register__label" for="username">USERNAME</label>
                <input className="Register__input" id="username" name="username" placeholder="Username" required
                value={username} onChange={handleChange}/>
                <label className="Register__label" for="password">PASSWORD</label>
                <input className="Register__input" id="password" name="password" placeholder="Enter a valid password" type="password" required
                value={password} onChange={handleChange}/>
                <input id="registerButton" className="Register__button" type="submit" value="REGISTER" onClick={handleClick}/>
                <button id="googleRegisterButton" className="Register__google__button" onClick={handleClick}>GOOGLE SIGNUP</button>
            </form>
            <p className="Register__loginLink">Already registered? Please Login.</p>
        </section>
    );
}

export default Register;