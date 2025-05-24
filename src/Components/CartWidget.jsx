import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { CartContext } from '../context/ShoppingCartContext';
import '../styles/styles.css';

const CartWidget = () => {
    const { getTotalQuantity } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate('/carrito')} className="cart-widget">
            <Badge count={getTotalQuantity()} showZero>
                <ShoppingCartOutlined style={{ fontSize: 24 }} />
            </Badge>
        </div>
    );
};

export default CartWidget;