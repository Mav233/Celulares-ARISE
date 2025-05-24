import React from 'react';
import Item from './Item.jsx';
import '../styles/styles.css';

const ItemList = ({ products }) => {
    return (
        <div className="item-list">
            {products.length === 0 ? (
                <p className="no-products">No hay productos disponibles en esta categoría.</p>
            ) : (
                products.map((product) => (
                    <Item
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        stock={product.stock}
                        category={product.category}
                    />
                ))
            )}
        </div>
    );
};

export default ItemList;