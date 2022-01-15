import React from 'react';
import './Register.css';

const Register = () => {
    return (
        <section className="Register">
            <h2 className="Register__title">New User Registration</h2>
            <form className="Register__form" method="post" action="/users/register">
                <label className="Register__label" for="firstName">FIRST NAME</label>
                <input className="Register__input" id="firstName" name="firstName" placeholder="First Name" pattern="[A-Za-z]" required />
                <label className="Register__label" for="lastName">LAST NAME</label>
                <input className="Register__input" id="lastName" name="lastName" placeholder="Last Name" pattern="[A-Za-z]" required />
                <label className="Register__label" for="email">EMAIL</label>
                <input className="Register__input" id="email" name="email" placeholder="Enter your email address" type="email" required />
                <label className="Register__label" for="username">USERNAME</label>
                <input className="Register__input" id="username" name="username" placeholder="Username" required />
                <label className="Register__label" for="password">PASSWORD</label>
                <input className="Register__input" id="password" name="password" placeholder="Enter a valid password" type="password" required />
                <input className="Register__button" type="submit" value="REGISTER" />
            </form>
        </section>
    );
}

export default Register;