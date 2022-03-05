import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import './Profile.css';
import Loader from '../../components/loader/Loader';
import { loadUserById, updateUser, selectUser, selectUserId, selectLoadingUser, selectLoadUserError, selectRegisterUserSuccess,
        selectUpdatingUser, selectUpdateUserSuccess, selectUpdateUserError, clearUsersStatusUpdates, selectLoginSuccess, 
        selectGoogleLoginSuccess } from '../../features/users/usersSlice';

const Profile = () => {
    const user = useSelector(selectUser);
    const userId = useSelector(selectUserId);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [gender, setGender] = useState(user.gender);
    let [dob, setDob] = useState(user.date_of_birth);
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState('');
    const [streetAddress, setStreetAddress] = useState(user.street_address);
    const [city, setCity] = useState(user.city);
    const [state, setState] = useState(user.state);
    const [zip, setZip] = useState(user.zip_code);
    const dispatch = useDispatch();
    const loadingUser = useSelector(selectLoadingUser);
    const loadUserError = useSelector(selectLoadUserError);
    const registerUserSuccess = useSelector(selectRegisterUserSuccess);
    const updatingUser = useSelector(selectUpdatingUser);
    const updateUserSuccess = useSelector(selectUpdateUserSuccess);
    const updateUserError = useSelector(selectUpdateUserError);
    const loginSuccess = useSelector(selectLoginSuccess);
    const googleLoginSuccess = useSelector(selectGoogleLoginSuccess);
    dob = dob.slice(5,7) + '/' + dob.slice(8,10) +'/' + dob.slice(0,4);
    let navigate = useNavigate();

    const userProfile = {
        firstName,
        lastName,
        gender,
        dob,
        phone,
        email,
        username,
        password,
        streetAddress,
        city,
        state,
        zip
    };

    const handleChange = ({ target }) => {
        if (target.name === "firstName") {
            setFirstName(target.value);
        }
        else if (target.name === "lastName") {
            setLastName(target.value);
        }
        else if (target.name === "gender") {
            setGender(target.value);
        }
        else if (target.name === "dob") {
            setDob(target.value);
        }
        else if (target.name === "phone") {
            setPhone(target.value);
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
        else if (target.name === "streetAddress") {
            setStreetAddress(target.value);
        }
        else if (target.name === "city") {
            setCity(target.value);
        }
        else if (target.name === "state") {
            setState(target.value);
        }
        else if (target.name === "zip") {
            setZip(target.value);
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target.id === 'profileButton') {
            dispatch(updateUser({ userId, userProfile }));
        }
    };

    useEffect(() => {
        if (!userId) {
            navigate('/login');
        }
        else {
            dispatch(loadUserById(userId));
        }
    }, []);

    useEffect(() => {
        if (registerUserSuccess || updateUserSuccess || loginSuccess || googleLoginSuccess) {
            dispatch(loadUserById(userId));
        }
        if (loadUserError || updateUserSuccess || updateUserError) {
            dispatch(clearUsersStatusUpdates());
        }
    }, [user, userId, loadUserError, registerUserSuccess, updateUserSuccess, updateUserError, loginSuccess, googleLoginSuccess, dispatch]);

    if (loadingUser || updatingUser) {
        return (
            <section className="Profile">
                <Loader />
            </section>
        );
    }
    if (loadUserError || updateUserError) {
        return (
            <section className="Profile">
                <p className="Profile__error">An unexpected error has occurred.</p>
            </section>
        );
    }
    return (
        <section className="Profile">
            <h2 className="Profile__title">User Profile</h2>
            <form className="Profile__form" method="post" action="">
                <div className="Profile__container">
                    <label className="Profile__label" for="firstName">FIRST NAME</label>
                    <input className="Profile__input" id="firstName" name="firstName" placeholder="First Name" pattern="[A-Za-z]" required
                    value={firstName} onChange={handleChange}/>
                    <label className="Profile__label" for="lastName">LAST NAME</label>
                    <input className="Profile__input" id="lastName" name="lastName" placeholder="Last Name" pattern="[A-Za-z]" required
                    value={lastName} onChange={handleChange}/>
                    <label className="Profile__label" for="gender">GENDER</label>
                    <input className="Profile__input" id="gender" name="gender" placeholder="Enter your gender" pattern="[A-Za-z]" required
                    value={gender} onChange={handleChange}/>
                    <label className="Profile__label" for="dob">DATE OF BIRTH</label>
                    <input className="Profile__input" id="dob" name="dob" placeholder="Enter your date of birth" required
                    value={dob} onChange={handleChange}/>
                    <label className="Profile__label" for="phone">PHONE NUMBER</label>
                    <input className="Profile__input" id="phone" name="phone" placeholder="Enter your phone number" required
                    value={phone} onChange={handleChange}/>
                    <label className="Profile__label" for="email">EMAIL</label>
                    <input className="Profile__input" id="email" name="email" placeholder="Enter your email address" type="email" required
                    value={email} onChange={handleChange}/>
                    <label className="Profile__label" for="username">USERNAME</label>
                    <input className="Profile__input" id="username" name="username" placeholder="Username" required
                    value={username} onChange={handleChange}/>
                    <label className="Profile__label" for="password">PASSWORD</label>
                    <input className="Profile__input" id="password" name="password" placeholder="Enter and submit a new password to change password" type="password" required
                    value={password} onChange={handleChange}/>
                    <label className="Profile__label" for="streetAddress">STREET ADDRESS</label>
                    <input className="Profile__input" id="streetAddress" name="streetAddress" placeholder="Street Address" required
                    value={streetAddress} onChange={handleChange}/>
                    <label className="Profile__label" for="city">CITY</label>
                    <input className="Profile__input" id="city" name="city" placeholder="City" required
                    value={city} onChange={handleChange}/>
                    <label className="Profile__label" for="state">STATE</label>
                    <input className="Profile__input" id="state" name="state" placeholder="State" required
                    value={state} onChange={handleChange}/>
                    <label className="Profile__label" for="zipcode">ZIP CODE</label>
                    <input className="Profile__input" id="zipcode" name="zipcode" placeholder="Zip Code" required
                    value={zip} onChange={handleChange}/>
                </div>
                <input id="profileButton" className="Profile__button" type="submit" value="SUBMIT" onClick={handleClick}/>
            </form>
        </section>
    );
}

export default Profile;