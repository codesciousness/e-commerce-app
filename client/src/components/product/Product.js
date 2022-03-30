import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Product.css';
import { setProductId } from '../../features/products/productsSlice';
import { loadCart, updateCart, selectCartId } from '../../features/cart/cartSlice';
import { selectUserId } from '../../features/users/usersSlice';

const Product = ({ product, display }) => {
    const [cartQuantity, setCartQuantity] = useState(product.cart_quantity);
    const [quantity, setQuantity] = useState(product.cart_quantity);
    const cartId = useSelector(selectCartId);
    const userId = useSelector(selectUserId);
    const productId = product.product_id;
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleProductClick = () => {
        dispatch(setProductId(productId));
    };

    const handleQuantityClick = ({ target }) => {
        if (target.id === "addButton") {
            setCartQuantity(prev => prev + 1);
        }
        else if (target.id === "subButton") {
            setCartQuantity(prev => {
                if (!prev) return
                else return prev - 1;
            });
        }
    };

    const handleCartClick = () => {
        if (!userId) {
            navigate("/login");
        }
        else if (cartQuantity) {
            setCartQuantity(prev => prev + 1);
        }
        else {
            setCartQuantity(1);
        }
    };

    useEffect(() => {
        if (quantity !== cartQuantity) {
            dispatch(updateCart({ cartId, userId, productId, cartQuantity }));
            dispatch(loadCart({ cartId, userId }));
            setQuantity(cartQuantity);
        }
    }, [cartId, userId, productId, cartQuantity, quantity, dispatch]);
    
    if (display === 'inCart') {
        return (
            <section className="Product__inCart">
                <img className="Product__inCart__image" src={product.url} alt="" />
                <div className="Product__inCart__info">
                    <div className="Product__inCart__container">
                        <p className="Product__inCart__label">PRODUCT NAME</p>
                        <Link to={`/products/${productId}`}><h2 id={product.product_id} className="Product__inCart__name" 
                        onClick={handleProductClick}>{product.name}</h2></Link>
                    </div>
                    <div className="Product__inCart__container">
                        <p className="Product__inCart__label">QUANTITY</p>
                        <div className="Product__inCart__quantity__container">
                            <button id="subButton" className="Product__inCart__button" onClick={handleQuantityClick}>-</button>
                            <input id="quantity" className="Product__inCart__quantity" type="number" name="quantity" min="0" max="100"
                            value={cartQuantity} readOnly/>
                            <button id="addButton" className="Product__inCart__button" onClick={handleQuantityClick}>+</button>
                        </div>
                    </div>
                    <div className="Product__inCart__container">
                        <p className="Product__inCart__label">PRICE</p>
                        <p className="Product__inCart__price">{product.sell_price}</p>
                    </div>
                    <div className="Product__inCart__container">
                        <p className="Product__inCart__label">ITEM TOTAL</p>
                        <p className="Product__inCart__itemTotal">${product.item_total}</p>
                    </div>
                </div>
            </section>
        );
    }
    else if (display === 'details') {
        return (
            <section className="Product__details">
                <div className="Product__details__main">
                    <img className="Product__details__image" src={product.url} alt="" />
                    <div className="Product__details__main__info">
                        <div className="Product__details__main__container">
                            <p className="Product__details__label">PRODUCT NAME</p>
                            <h2 id={product.product_id} className="Product__details__name" onClick={handleProductClick}>{product.name}</h2>
                        </div>
                        <div className="Product__details__main__container">
                            <p className="Product__details__label">CATEGORY</p>
                            <p className="Product__details__category">{product.category}</p>
                        </div>
                        <div className="Product__details__main__container">
                            <p className="Product__details__label">PRICE</p>
                            <p className="Product__details__price">{product.sell_price}</p>
                        </div>
                        <button className="Product__button" onClick={handleCartClick}>Add to Cart <i className="fas fa-cart-plus fa-lg"></i></button>
                    </div>
                </div>
                <div className="Product__details__container">
                    <div className="Product__details__info">
                        <div className="Product__details__label__container">
                            <p className="Product__details__label">IN STOCK</p>
                            <p className="Product__details__stock">{product.stock_quantity}</p>
                        </div>
                        <div className="Product__details__label__container">
                            <p className="Product__details__label">DESCRIPTION</p>
                            <p className="Product__details__description">{product.description}</p>
                        </div>
                        <div className="Product__details__label__container">
                            <p className="Product__details__label">MANUFACTURER</p>
                            <p className="Product__details__manufacturer">{product.manufacturer}</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    else {
        return (
            <section className="Product">
                <p className="Product__category">{product.category}</p>
                <img className="Product__image" src={product.url} alt="" />
                <div className="Product__info">
                <Link to={`/products/${productId}`}><h2 id={product.product_id} className="Product__name" onClick={handleProductClick}>{product.name}</h2></Link>
                    <p className="Product__price">{product.sell_price}</p>
                    <button className="Product__button" onClick={handleCartClick}>Add to Cart <i className="fas fa-cart-plus fa-lg"></i></button>
                </div> 
            </section>
        );
    }
}

export default Product;