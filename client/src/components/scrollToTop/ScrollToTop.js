import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useLocation } from "react-router";
import { selectCheckoutSuccess } from '../../features/cart/cartSlice';

const ScrollToTop = (props) => {
  const checkoutSuccess = useSelector(selectCheckoutSuccess);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location, checkoutSuccess]);

  return <>{props.children}</>
};

export default ScrollToTop;