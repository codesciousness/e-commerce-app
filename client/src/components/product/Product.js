import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Product.css';
import { setProduct } from '../../features/products/productsSlice';
import { loadCart, updateCart, selectCartId } from '../../features/cart/cartSlice';

const Product = ({ product, inCart }) => {
    const [cartQuantity, setCartQuantity] = useState(product.cart_quantity);
    const [quantity, setQuantity] = useState(product.cart_quantity);
    const dispatch = useDispatch();
    const cartId = useSelector(selectCartId);
    const productId = product.id ? product.id : product.product_id;

    const handleProductClick = ({ target }) => {
        dispatch(setProduct(target.id));
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
        if (cartQuantity) {
            setCartQuantity(prev => prev + 1);
        }
        else {
            setCartQuantity(1);
        }
    };

    useEffect(() => {
        if (quantity !== cartQuantity) {
            dispatch(updateCart({ cartId, productId, cartQuantity }));
            dispatch(loadCart(cartId));
            setQuantity(cartQuantity);
        }
    }, [cartId, productId, cartQuantity, quantity, dispatch]);
    
    if (inCart) {
        return (
            <section className="Product__inCart">
                <img className="Product__inCart__image" src={`https://source.unsplash.com/200x200/?${product.category}`} alt="" />
                <div className="Product__inCart__info">
                    <div className="Product__inCart__container">
                        <p className="Product__inCart__label">PRODUCT NAME</p>
                        <h2 id={product.product_id} className="Product__inCart__name" onClick={handleProductClick}>{product.name}</h2>
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
    else {
        return (
            <section className="Product">
                <p className="Product__category">{product.category}</p>
                <img className="Product__image" src={`https://source.unsplash.com/250x250/?${product.category}`} alt="" />
                <div className="Product__info">
                    <h2 id={product.id} className="Product__name" onClick={handleProductClick}>{product.name}</h2>
                    <p className="Product__price">{product.sell_price}</p>
                    <button className="Product__button" onClick={handleCartClick}>Add to Cart <i className="fas fa-cart-plus fa-lg"></i></button>
                </div> 
            </section>
        );
    }
}

export default Product;