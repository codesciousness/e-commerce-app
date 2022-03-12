import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import './Profile.css';
import Loader from '../../components/loader/Loader';
import { loadUserById, updateUser, changePassword, selectUser, selectUserId, selectLoadingUser, selectLoadUserError, selectRegisterUserSuccess,
        selectUpdatingUser, selectUpdateUserSuccess, selectUpdateUserError,  selectChangePasswordSuccess, selectChangePasswordError,
        selectLoginSuccess, selectGoogleLoginSuccess, clearUsersStatusUpdates } from '../../features/users/usersSlice';

const Profile = () => {
    const user = useSelector(selectUser);
    const userId = useSelector(selectUserId);
    const [username, setUsername] = useState(user.username);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [gender, setGender] = useState(user.gender);
    let [dob, setDob] = useState(user.date_of_birth);
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState(user.email);
    const [streetAddress, setStreetAddress] = useState(user.street_address);
    const [city, setCity] = useState(user.city);
    const [state, setState] = useState(user.state);
    const [zip, setZip] = useState(user.zip_code);
    const [password, setPassword] = useState('');
    const [passCheck, setPassCheck] = useState('');
    const passwordMatch = password === passCheck;
    const loadingUser = useSelector(selectLoadingUser);
    const loadUserError = useSelector(selectLoadUserError);
    const registerUserSuccess = useSelector(selectRegisterUserSuccess);
    const updatingUser = useSelector(selectUpdatingUser);
    const updateUserSuccess = useSelector(selectUpdateUserSuccess);
    const updateUserError = useSelector(selectUpdateUserError);
    const changePasswordSuccess = useSelector(selectChangePasswordSuccess);
    const changePasswordError = useSelector(selectChangePasswordError);
    const loginSuccess = useSelector(selectLoginSuccess);
    const googleLoginSuccess = useSelector(selectGoogleLoginSuccess);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const formatDate = () => {
        if (userId && dob) {
            dob = dob.slice(5,7) + '/' + dob.slice(8,10) +'/' + dob.slice(0,4);
        }
    };
    formatDate();

    const userProfile = {
        firstName,
        lastName,
        gender,
        dob,
        phone,
        email,
        username,
        streetAddress,
        city,
        state,
        zip
    };

    const styleInput = () => {
        if (!password) {
            return 'Profile__input'
        }
        else if (password && passwordMatch) {
            return 'Profile__input Profile__password__match'
        }
        else if (password && !passwordMatch) {
            return 'Profile__input Profile__password__dontmatch'
        }
    }

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
        else if (target.name === "passCheck") {
            setPassCheck(target.value);
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
        else if (e.target.id === 'passwordButton') {
            if (passwordMatch) {
                dispatch(changePassword({ userId, password }));
            }
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
        if (changePasswordSuccess) {
            setPassword('');
            setPassCheck('');
        }
        if (loadUserError || updateUserSuccess || updateUserError || changePasswordSuccess || changePasswordError) {
            dispatch(clearUsersStatusUpdates());
        }
    }, [userId, loadUserError, registerUserSuccess, updateUserSuccess, updateUserError, changePasswordSuccess, changePasswordError, loginSuccess, googleLoginSuccess, dispatch])
;
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
    if (!userId) return null;
    return (
        <section className="Profile">
            <h2 className="Profile__title">User Profile</h2>
            <form className="Profile__form" method="post" action="">
                <div className="Profile__container">
                    <label className="Profile__label" for="username">USERNAME</label>
                    <input className="Profile__input" id="username" name="username" placeholder="Username" required
                    value={username} onChange={handleChange}/>
                    <label className="Profile__label" for="firstName">FIRST NAME</label>
                    <input className="Profile__input" id="firstName" name="firstName" placeholder="First Name" pattern="[A-Za-z]" required
                    value={firstName} onChange={handleChange}/>
                    <label className="Profile__label" for="lastName">LAST NAME</label>
                    <input className="Profile__input" id="lastName" name="lastName" placeholder="Last Name" pattern="[A-Za-z]" required
                    value={lastName} onChange={handleChange}/>
                    <label className="Profile__label" for="gender">GENDER</label>
                    <input className="Profile__input" id="gender" name="gender" placeholder="Enter your gender" pattern="[A-Za-z]" 
                    value={gender} onChange={handleChange}/>
                    <label className="Profile__label" for="dob">DATE OF BIRTH</label>
                    <input className="Profile__input" id="dob" name="dob" placeholder="Enter your date of birth" 
                    value={dob} onChange={handleChange}/>
                    <label className="Profile__label" for="phone">PHONE NUMBER</label>
                    <input className="Profile__input" id="phone" name="phone" placeholder="Enter your phone number" 
                    value={phone} onChange={handleChange}/>
                    <label className="Profile__label" for="email">EMAIL</label>
                    <input className="Profile__input" id="email" name="email" placeholder="Enter your email address" type="email" required
                    value={email} onChange={handleChange}/>
                    <label className="Profile__label" for="streetAddress">STREET ADDRESS</label>
                    <input className="Profile__input" id="streetAddress" name="streetAddress" placeholder="Street Address" 
                    value={streetAddress} onChange={handleChange}/>
                    <label className="Profile__label" for="city">CITY</label>
                    <input className="Profile__input" id="city" name="city" placeholder="City" 
                    value={city} onChange={handleChange}/>
                    <label className="Profile__label" for="state">STATE</label>
                    <input className="Profile__input" id="state" name="state" placeholder="State" 
                    value={state} onChange={handleChange}/>
                    <label className="Profile__label" for="zipcode">ZIP CODE</label>
                    <input className="Profile__input" id="zipcode" name="zipcode" placeholder="Zip Code" 
                    value={zip} onChange={handleChange}/>
                    <input id="profileButton" className="Profile__button" type="submit" value="UPDATE PROFILE" onClick={handleClick}/>
                </div>
                <div className="Profile__container">
                    <label className="Profile__label" for="password"> CHANGE PASSWORD</label>
                    <input className={styleInput()} id="password" name="password" placeholder="Enter a new password" type="password" required
                    value={password} onChange={handleChange}/>
                    {password && <input className={styleInput()} id="passCheck" name="passCheck" placeholder="Re-enter your new passord" type="password" required
                    value={passCheck} onChange={handleChange}/>}
                    {password && passwordMatch && <input id="passwordButton" className="Profile__button" type="submit" value="CHANGE PASSWORD" onClick={handleClick}/>}
                </div>  
            </form>
        </section>
    );
}

export default Profile;