import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { AccountCircle } from '@mui/icons-material';
import TextInput from '../../material-ui/TextInput';
import Alert from '../../material-ui/Alert';
import Button from '../../material-ui/Button';
import Checkbox from '../../material-ui/Checkbox';
import Loader from '../loader/Loader';
import { login, googleLogin, selectLoggingIn, selectLoginSuccess,
    selectLoginError, clearUsersStatusUpdates } from '../../features/users/usersSlice';
import BackgroundImg from '../../resources/images/confectionary-pattern.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const loggingIn = useSelector(selectLoggingIn);
    const loginSuccess = useSelector(selectLoginSuccess);
    const loginError = useSelector(selectLoginError);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const style = {
        backgroundImage: `url(${BackgroundImg})`
    };

    const handleChange = ({ target }) => {
        if (target.name === 'username') {
            setUsername(target.value);
        }
        else if (target.name === 'password') {
            setPassword(target.value);
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target.id === 'login-button') {
            dispatch(login({ username, password }));
        }
        else if (e.target.id === 'googlelogin-button') {
            dispatch(googleLogin());
        }
    };

    useEffect(() => {
        return () => dispatch(clearUsersStatusUpdates());
    }, [dispatch]);

    useEffect(() => {
        if (loginSuccess) {
            setUsername('');
            setPassword('');
            navigate('/');
            dispatch(clearUsersStatusUpdates());
        }
    }, [loginSuccess, dispatch, navigate]);

    if (loggingIn) {
        return (
            <section className="Login">
                <Loader />
            </section>
        );
    }
    return (
        <section style={style} className="Login">
            <h2 className="Login__title">User Login</h2>
            <form className="Login__form" method="post" action="">
                <h3 className="Login__form__title">Login</h3>
                <AccountCircle sx={{ fontSize: 72, alignSelf: 'center' }}/>
                {loginError && <Alert severity='error' msg={loginError} onClose={() => dispatch(clearUsersStatusUpdates())}/>}
                <TextInput name="Username" value={username} onChange={handleChange}/>
                <TextInput name="Password" value={password} type="password" onChange={handleChange}/>
                <p><Checkbox label="Remember me"/></p>
                <Button name="Login" fullWidth onClick={handleClick}/>
                <Button name="Google Login" fullWidth onClick={handleClick}/>
                <Link to='/register'><p className="Login__registerLink">New user? Please Register.</p></Link>
            </form>
        </section>
    );
}

export default Login;