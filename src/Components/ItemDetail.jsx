import React, { useState, useContext } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { CartContext } from '../context/ShoppingCartContext';
import ItemCount from './ItemCount.jsx';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const ItemDetail = ({ id, title, description, price, stock }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        if (quantity > 0) {
            addToCart({
                id,
                title,
                price,
                stock,
                quantity
            });
        }
    };
    const formatPrice = (price) => {
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 2,
        }).format(price);
    };

    // ...

    <p><strong>Precio:</strong> {formatPrice(price)}</p>


    return (
        <Card title={title}>
            <p>{description}</p>
            <p><strong>Precio:</strong> ${price}</p>

            <ItemCount stock={stock} initial={1} onQuantityChange={setQuantity} />

            <Button
                label="Agregar al carrito"
                icon="pi pi-shopping-cart"
                severity="success"
                outlined
                onClick={handleAddToCart}
            />
        </Card>

    );
};

export default ItemDetail;
