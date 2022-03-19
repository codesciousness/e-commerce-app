import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { logout, selectUserId, selectLogoutSuccess, selectLogoutError, clearUsersStatusUpdates } from '../../features/users/usersSlice';
import { clearCart } from '../../features/cart/cartSlice';
import { clearOrder } from '../../features/orders/ordersSlice';
import { clearProduct } from '../../features/products/productsSlice';

const Navbar = () => {
    const userId = useSelector(selectUserId);
    const logoutSuccess = useSelector(selectLogoutSuccess);
    const logoutError = useSelector(selectLogoutError);
    const dispatch = useDispatch();
    let location = useLocation();
    let navigate = useNavigate();
    let home = location.pathname === '/';
    let Button;

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target.id === 'logoutButton') {
        dispatch(logout());
        dispatch(clearCart());
        dispatch(clearOrder());
        dispatch(clearProduct());
        }
    };
        
    if (userId) {
        Button =
        <li className="Navbar__li">
            <Link to='/'>
            <button id='logoutButton' className="Navbar__logout__button" onClick={handleClick}><i className="fas fa-sign-out-alt fa-lg"></i> Logout</button>
            </Link>
        </li>
        
    }
    else {
        Button = 
        <li className="Navbar__li">
            <Link to='login'>
            <button id='loginButton' className="Navbar__login__button"><i className="fas fa-sign-in-alt fa-lg"></i> Login</button>
            </Link>
        </li> 
    }

    useEffect(() => {
        if (logoutSuccess || logoutError) {
        dispatch(clearUsersStatusUpdates());
        navigate('/');
        }
    }, [logoutSuccess, logoutError, dispatch, navigate]);

    return (
        <nav className="Navbar">
            <Link to='/'>{home ? <h1 className="Navbar__title">Lots 'N Lots Store</h1> : <div className="Navbar__div"><i className="fas fa-home fa-lg"></i><p>Home</p></div>}</Link>
            <ul className="Navbar__list">
                <li className="Navbar__li"><Link to='cart'><div className="Navbar__div"><i className="fas fa-shopping-cart fa-lg"></i><p>Cart</p></div></Link></li>
                <li className="Navbar__li"><Link to='orders'><div className="Navbar__div"><i className="fas fa-box-open fa-lg"></i><p>Orders</p></div></Link></li>
                <li className="Navbar__li"><Link to='profile'><div className="Navbar__div"><i className="fas fa-user fa-lg"></i><p>Profile</p></div></Link></li>
                <li className="Navbar__li"><Link to='register'><div className="Navbar__div"><i className="fas fa-sign-in-alt fa-lg"></i><p>Sign Up</p></div></Link></li>
                {Button}
            </ul>
        </nav>
    );
}

export default Navbar;