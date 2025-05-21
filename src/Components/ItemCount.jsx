import React, { useState } from 'react';

const ItemCount = ({ stock, initial = 1, onQuantityChange }) => {
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
        <div>
            <button onClick={decrease}>-</button>
            <span style={{ margin: '0 1rem' }}>{count}</span>
            <button onClick={increase}>+</button>
        </div>
    );
};

export default ItemCount;
