import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Product.css';
import { setProduct } from '../../features/products/productsSlice';
import { updateCart, selectCartId } from '../../features/cart/cartSlice';

const Product = ({ product, inCart }) => {
    let [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const cartId = useSelector(selectCartId);

    const handleProductClick = ({ target }) => {
        dispatch(setProduct(target.id));
    };

    const handleQuantityChange = ({ target }) => {
        if (target.id === "subButton") {
            setQuantity(prev => {
                if (prev > 0) {
                    return prev - 1;
                }
                else return;
            });
        }
        if (target.id === "addButton") {
            setQuantity(prev => prev + 1);
        }
    };

    const handleCartClick = () => {
        const productId = product.id;
        setQuantity(prev => prev + 1);
        dispatch(updateCart({ cartId, productId, cartQuantity: quantity }));
    };
    
    if (inCart) {
        return (
            <section className="Product__inCart">
                <img className="Product__inCart__image" src={`https://source.unsplash.com/200x200/?${product.category}`} alt="" />
                <div className="Product__inCart__info">
                    <div className="Product__inCart__container">
                        <p className="Product__inCart__label">PRODUCT NAME</p>
                        <h2 id={product.id} className="Product__inCart__name" onClick={handleProductClick}>{product.name}</h2>
                    </div>
                    <div className="Product__inCart__container">
                        <p className="Product__inCart__label">QUANTITY</p>
                        <div className="Product__inCart__quantity__container">
                            <button id="subButton" className="Product__inCart__button" onClick={handleQuantityChange}>-</button>
                            <input className="Product__inCart__quantity" type="number" name="quantity" min="0" max="100" value={quantity} />
                            <button id="addButton" className="Product__inCart__button" onClick={handleQuantityChange}>+</button>
                        </div>
                    </div>
                    <div className="Product__inCart__container">
                        <p className="Product__inCart__label">PRICE</p>
                        <p className="Product__inCart__price">{product.sell_price}</p>
                    </div>
                    <div className="Product__inCart__container">
                        <p className="Product__inCart__label">ITEM TOTAL</p>
                        <p className="Product__inCart__itemTotal">{product.item_total}</p>
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
                    <button className="Product__button" onClick={handleCartClick}><i className="fas fa-cart-plus fa-lg"></i> Add to Cart</button>
                </div> 
            </section>
        );
    }
}

export default Product;