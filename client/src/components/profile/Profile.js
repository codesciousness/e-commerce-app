import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './Profile.css';
import { AccountCircle } from '@mui/icons-material';
import TextInput from '../../material-ui/TextInput';
import Alert from '../../material-ui/Alert';
import Button from '../../material-ui/Button';
import Loader from '../../components/loader/Loader';
import { loadUserById, updateUser, changePassword, selectUser, selectUserId, selectLoadingUser, selectLoadUserError, selectRegisterUserSuccess,
        selectUpdatingUser, selectUpdateUserSuccess, selectUpdateUserError,  selectChangePasswordSuccess, selectChangePasswordError,
        selectLoginSuccess, clearUsersStatusUpdates } from '../../features/users/usersSlice';
import BackgroundImg from '../../resources/images/gplay-pattern.png';

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
    const [passMatch, setPassMatch] = useState('');
    const passwordMatch = password === passMatch;
    const loadingUser = useSelector(selectLoadingUser);
    const loadUserError = useSelector(selectLoadUserError);
    const registerUserSuccess = useSelector(selectRegisterUserSuccess);
    const updatingUser = useSelector(selectUpdatingUser);
    const updateUserSuccess = useSelector(selectUpdateUserSuccess);
    const updateUserError = useSelector(selectUpdateUserError);
    const changePasswordSuccess = useSelector(selectChangePasswordSuccess);
    const changePasswordError = useSelector(selectChangePasswordError);
    const loginSuccess = useSelector(selectLoginSuccess);
    const dispatch = useDispatch();

    const style = {
        backgroundImage: `url(${BackgroundImg})`
    };

    const formatDate = () => {
        if (userId && dob && dob.length === 24) {
            dob = dob.slice(5,7) + '/' + dob.slice(8,10) +'/' + dob.slice(0,4);
        }
    };
    formatDate();

    const userProfile = {
        username,
        firstName,
        lastName,
        email,
        gender,
        dob,
        phone,
        streetAddress,
        city,
        state,
        zip
    };

    const handleChange = ({ target }) => {
        if (target.name === 'username') {
            setUsername(target.value);
        }
        else if (target.name === 'firstname') {
            setFirstName(target.value);
        }
        else if (target.name === 'lastname') {
            setLastName(target.value);
        }
        else if (target.name === 'email') {
            setEmail(target.value);
        }
        else if (target.name === 'gender') {
            setGender(target.value);
        }
        else if (target.name === 'dateofbirth') {
            setDob(target.value);
        }
        else if (target.name === 'phonenumber') {
            setPhone(target.value);
        }
        else if (target.name === 'streetaddress') {
            setStreetAddress(target.value);
        }
        else if (target.name === 'city') {
            setCity(target.value);
        }
        else if (target.name === 'state') {
            setState(target.value);
        }
        else if (target.name === 'zipcode') {
            setZip(target.value);
        }
        else if (target.name === 'newpassword') {
            setPassword(target.value);
        }
        else if (target.name === 'passwordmatch') {
            setPassMatch(target.value);
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target.id === 'updateprofile-button') {
            dispatch(updateUser({ userId, userProfile }));
        }
        else if (e.target.id === 'changepassword-button') {
            if (passwordMatch) {
                dispatch(changePassword({ userId, password }));
            }
        }
    };

    useEffect(() => {
        return () => dispatch(clearUsersStatusUpdates());
    }, [dispatch]);

    useEffect(() => {
        if (userId) {
            dispatch(loadUserById(userId));
        }
    }, []);

    useEffect(() => {
        if (registerUserSuccess || updateUserSuccess || loginSuccess) {
            dispatch(loadUserById(userId));
        }
        if (changePasswordSuccess) {
            setPassword('');
            setPassMatch('');
        }
        if (loadUserError || updateUserSuccess || changePasswordSuccess) {
            dispatch(clearUsersStatusUpdates());
        }
    }, [userId, loadUserError, registerUserSuccess, updateUserSuccess, changePasswordSuccess, loginSuccess, dispatch])
;
    if (loadingUser || updatingUser) {
        return (
            <section className="Profile">
                <Loader />
            </section>
        );
    }
    if (!userId) return null;
    return (
        <section style={style}className="Profile">
            <h2 className="Profile__title">User Profile</h2>
            <form className="Profile__form" method="post" action="">
                <div className="Profile__container">
                    <h3 className="Profile__form__title">{`Hi, ${user.first_name}!`}</h3>
                    <AccountCircle sx={{ fontSize: 72, alignSelf: 'center' }}/>
                    {loadUserError && <Alert severity='error' msg={loadUserError} onClose={() => dispatch(clearUsersStatusUpdates())}/>}
                    {updateUserError && <Alert severity='error' msg={updateUserError} onClose={() => dispatch(clearUsersStatusUpdates())}/>}
                    <TextInput name="Username" value={username} onChange={handleChange}/>
                    <TextInput name="First Name" value={firstName} onChange={handleChange}/>
                    <TextInput name="Last Name" value={lastName} onChange={handleChange}/>
                    <TextInput name="Email" value={email} type="email" onChange={handleChange}/>
                    <TextInput name="Gender" value={gender} onChange={handleChange}/>
                    <TextInput name="Date of Birth" value={dob} onChange={handleChange}/>
                    <TextInput name="Phone Number" value={phone} onChange={handleChange}/>
                    <TextInput name="Street Address" value={streetAddress} onChange={handleChange}/>
                    <TextInput name="City" value={city} onChange={handleChange}/>
                    <TextInput name="State" value={state} onChange={handleChange}/>
                    <TextInput name="Zip Code" value={zip} onChange={handleChange}/>
                    <Button name="Update Profile" fullWidth onClick={handleClick}/>
                </div>
                <div className="Profile__container">
                    <h3 className="Profile__form__title">Change Password</h3>
                    {changePasswordError && <Alert severity='error' msg={changePasswordError} onClose={() => dispatch(clearUsersStatusUpdates())}/>}
                    <TextInput name="New Password" value={password} type="password" onChange={handleChange}/>
                    {password && <TextInput name="Password Match" value={passMatch} type="password" 
                        placeholder="Re-enter your new passord" onChange={handleChange}/>}
                    {password && passwordMatch && <Button name="Change Password" fullWidth onClick={handleClick}/>}
                </div>
                <div className="Profile__container">
                    <h3 className="Profile__form__title">Order History</h3>
                    <div className="Profile__box">
                        <span className="Profile__icon"><i class="fas fa-box-open fa-2xl"></i></span>
                        <Link to='/orders'><p className="Profile__link">View past orders</p></Link>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default Profile;