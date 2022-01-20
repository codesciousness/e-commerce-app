import React from 'react';
import './Profile.css';

const Profile = () => {
    return (
        <section className="Profile">
            <h2 className="Profile__title">User Profile</h2>
            <form className="Profile__form" method="post" action="/users/userId/profile">
                <div className="Profile__container">
                    <label className="Profile__label" for="firstName">FIRST NAME</label>
                    <input className="Profile__input" id="firstName" name="firstName" placeholder="First Name" pattern="[A-Za-z]" required />
                    <label className="Profile__label" for="lastName">LAST NAME</label>
                    <input className="Profile__input" id="lastName" name="lastName" placeholder="Last Name" pattern="[A-Za-z]" required />
                    <label className="Profile__label" for="gender">GENDER</label>
                    <input className="Profile__input" id="gender" name="gender" placeholder="Enter your gender" pattern="[A-Za-z]" required />
                    <label className="Profile__label" for="dob">DATE OF BIRTH</label>
                    <input className="Profile__input" id="dob" name="dob" placeholder="Enter your date of birth" required />
                    <label className="Profile__label" for="phone">PHONE NUMBER</label>
                    <input className="Profile__input" id="phone" name="phone" placeholder="Enter your phone number" required />
                    <label className="Profile__label" for="email">EMAIL</label>
                    <input className="Profile__input" id="email" name="email" placeholder="Enter your email address" type="email" required />
                    <label className="Profile__label" for="username">USERNAME</label>
                    <input className="Profile__input" id="username" name="username" placeholder="Username" required />
                    <label className="Profile__label" for="password">PASSWORD</label>
                    <input className="Profile__input" id="password" name="password" placeholder="Enter a valid password" type="password" required />
                </div>
                <div className="Profile__container">
                    <label className="Profile__label" for="streetAddress">STREET ADDRESS</label>
                    <input className="Profile__input" id="streetAddress" name="streetAddress" placeholder="Street Address" required />
                    <label className="Profile__label" for="city">CITY</label>
                    <input className="Profile__input" id="city" name="city" placeholder="City" required />
                    <label className="Profile__label" for="state">STATE</label>
                    <input className="Profile__input" id="state" name="state" placeholder="State" required />
                    <label className="Profile__label" for="zipcode">ZIP CODE</label>
                    <input className="Profile__input" id="zipcode" name="zipcode" placeholder="Zip Code" required />
                </div>
                <input className="Profile__button" type="submit" value="SUBMIT" />
            </form>
        </section>
    );
}

export default Profile;