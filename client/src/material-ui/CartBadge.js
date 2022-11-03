import React from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartBadge = ({ num }) => {
    return (
        <Badge badgeContent={num} color='success'>
            <ShoppingCartIcon/>
        </Badge>
    );
}

export default CartBadge;