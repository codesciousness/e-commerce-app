import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { Login, Person, ShoppingBag } from '@mui/icons-material';
import CartBadge from '../../material-ui/Badge';
import { logout, selectUserId, selectUser, selectLogoutSuccess, selectLogoutError,
    clearUsersStatusUpdates } from '../../features/users/usersSlice';
import { loadCart, setCartId, clearCart, selectCart, 
    selectCartId } from '../../features/cart/cartSlice';
import { clearOrder } from '../../features/orders/ordersSlice';
import { clearProduct } from '../../features/products/productsSlice';

const Navbar = () => {
    const userId = useSelector(selectUserId);
    const user = useSelector(selectUser);
    const logoutSuccess = useSelector(selectLogoutSuccess);
    const logoutError = useSelector(selectLogoutError);
    const cart = useSelector(selectCart);
    const cartId = useSelector(selectCartId);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let Button;

    const getNumItems = () => {
        if (cart.items) {
            const itemNum = cart.items.reduce((acc, obj) => acc + obj.cart_quantity, 0);
            return itemNum;
        }
        else return 0;
    };

    const [numItems, setNumItems] = useState(getNumItems());

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
        dispatch(setCartId(user.cart_id));
        dispatch(loadCart({ cartId, userId }));
    }, [userId, user, cartId, dispatch]);

    useEffect(() => {
        setNumItems(getNumItems());
    }, [cart]);

    useEffect(() => {
        if (logoutSuccess || logoutError) {
        dispatch(clearUsersStatusUpdates());
        navigate('/');
        }
    }, [logoutSuccess, logoutError, dispatch, navigate]);

    return (
        <nav className="Navbar">
            <Link to='/'><h1 className="Navbar__title">Plus Ultra Store</h1><div className="Navbar__div home__icon"><i className="fas fa-home fa-lg"></i><p>Home</p></div></Link>
            <ul className="Navbar__list">
                <li className="Navbar__li">
                    <Link to='cart'>
                        <div className="Navbar__div">
                            <CartBadge num={numItems}/>
                            <p>Cart</p>
                        </div>
                    </Link>
                </li>
                <li className="Navbar__li">
                    <Link to='orders'>
                        <div className="Navbar__div">
                            <ShoppingBag/>
                            <p>Orders</p>
                        </div>
                    </Link>
                </li>
                <li className="Navbar__li">
                    <Link to='profile'>
                        <div className="Navbar__div">
                            <Person/>
                            <p>Profile</p>
                        </div>
                    </Link>
                </li>
                <li className="Navbar__li">
                    <Link to='register'>
                        <div className="Navbar__div">
                            <Login/>
                            <p>Signup</p>
                        </div>
                    </Link>
                </li>
                {Button}
            </ul>
        </nav>
    );
}

export default Navbar;