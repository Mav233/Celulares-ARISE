import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import db from '../FireBase/firebaseConfig.js';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import ItemCount from '../Components/ItemCount.jsx';
import { CartContext } from '../context/ShoppingCartContext.jsx';

const ItemDetailContainer = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, 'celulares', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.error('No se encontró el producto');
                }
            } catch (error) {
                console.error('Error al obtener el producto:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <p>Cargando producto...</p>;
    }

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            stock: product.stock,
            quantity
        });
    };

    return (
        <Card title={product.title} className="m-4">
            <p>{product.description}</p>
            <p><strong>Categoría:</strong> {product.category}</p>
            <p><strong>Precio:</strong> ${product.price}</p>
            <p><strong>Stock:</strong> {product.stock}</p>

            <ItemCount
                stock={product.stock}
                quantity={quantity}
                setQuantity={setQuantity}
            />

            <Button
                label="Agregar al carrito"
                severity="success"
                outlined
                className="mb-3"
                onClick={handleAddToCart}
                disabled={product.stock === 0 || quantity === 0}
            />
        </Card>
    );
};

export default ItemDetailContainer;
