import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { AccountCircle } from '@mui/icons-material';
import TextInput from '../../material-ui/TextInput';
import Alert from '../../material-ui/Alert';
import Button from '../../material-ui/Button';
import Checkbox from '../../material-ui/Checkbox';
import Loader from '../../components/loader/Loader';
import { registerUser, selectRegisteringUser, selectRegisterUserSuccess, selectRegisterUserError, googleLogin, 
        clearUsersStatusUpdates } from '../../features/users/usersSlice';
import BackgroundImg from '../../resources/images/confectionary-pattern.png';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const registeringUser = useSelector(selectRegisteringUser);
    const registerUserSuccess = useSelector(selectRegisterUserSuccess);
    const registerUserError = useSelector(selectRegisterUserError);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const style = {
        backgroundImage: `url(${BackgroundImg})`
    };

    const handleChange = ({ target }) => {
        if (target.name === 'firstname') {
            setFirstName(target.value);
        }
        else if (target.name === 'lastname') {
            setLastName(target.value);
        }
        else if (target.name === 'email') {
            setEmail(target.value);
        }
        else if (target.name === 'username') {
            setUsername(target.value);
        }
        else if (target.name === 'password') {
            setPassword(target.value);
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target.id === 'register-button') {
            dispatch(registerUser({ firstName, lastName, email, username, password }));
        }
        else if (e.target.id === 'googlesignup-button') {
            dispatch(googleLogin());
        }
    };

    useEffect(() => {
        return () => dispatch(clearUsersStatusUpdates());
    }, [dispatch]);

    useEffect(() => {
        if (registerUserSuccess) {
            setFirstName('');
            setLastName('');
            setEmail('');
            setUsername('');
            setPassword('');
            navigate('/');
            dispatch(clearUsersStatusUpdates());
        }
    }, [registerUserSuccess, dispatch, navigate]);

    if (registeringUser) {
        return (
            <section className="Register">
                <Loader />
            </section>
        );
    }
    return (
        <section style={style} className="Register">
            <h2 className="Register__title">New User Registration</h2>
            <form className="Register__form" method="post" action="">
                <h3 className="Register__form__title">Register</h3>
                <AccountCircle sx={{ fontSize: 72, alignSelf: 'center' }}/>
                {registerUserError && <Alert severity='error' msg={registerUserError} onClose={() => dispatch(clearUsersStatusUpdates())}/>}
                <TextInput name="First Name" value={firstName} onChange={handleChange}/>
                <TextInput name="Last Name" value={lastName} onChange={handleChange}/>
                <TextInput name="Email" value={email} type="email" onChange={handleChange}/>
                <TextInput name="Username" value={username} onChange={handleChange}/>
                <TextInput name="Password" value={password} type="password" onChange={handleChange}/>
                <p><Checkbox label="I agree to the Terms of Use and Privacy Policy"/></p>
                <Button name="Register" fullWidth onClick={handleClick}/>
                <Button name="Google Signup" fullWidth onClick={handleClick}/>
                <Link to='/login'><p className="Register__loginLink">Already registered? Please Login.</p></Link>
            </form>
        </section>
    );
}

export default Register;