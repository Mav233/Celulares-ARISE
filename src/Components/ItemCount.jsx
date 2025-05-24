import React, { useState } from 'react';
import '../styles/styles.css';

const ItemCount = ({ stock, initial = 1, onQuantityChange = () => { } }) => {
    const [count, setCount] = useState(initial);

    const increase = () => {
        if (count < stock) {
            const newCount = count + 1;
            setCount(newCount);
            onQuantityChange(newCount);
        }
    };

    const decrease = () => {
        if (count > 1) {
            const newCount = count - 1;
            setCount(newCount);
            onQuantityChange(newCount);
        }
    };

    return (
        <div className="item-count-container">
            <button className="neon-button" onClick={decrease}>-</button>
            <span className="item-count-display">{count}</span>
            <button className="neon-button" onClick={increase}>+</button>
        </div>
    );
};

export default ItemCount;