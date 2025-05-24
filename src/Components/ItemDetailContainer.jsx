import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import db from '../FireBase/firebaseConfig.js';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import ItemCount from '../Components/ItemCount.jsx';
import { CartContext } from '../context/ShoppingCartContext.jsx';
import '../styles/styles.css';

const ItemDetailContainer = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(CartContext);
    const toast = useRef(null);
    const navigate = useNavigate();

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

    const handleAddToCart = () => {
        if (!product) return;

        addToCart({
            id: product.id,
            title: product.name,
            price: product.price,
            stock: product.stock,
            quantity
        });

        toast.current.show({
            severity: 'success',
            summary: 'Producto agregado',
            detail: `"${product.name}" fue añadido correctamente`,
            life: 3000
        });
    };

    if (!product) {
        return <p className="loading-text">Cargando producto...</p>;
    }

    return (
        <div className="item-detail-container">
            <Toast ref={toast} />
            <Card title={product.name} className="item-detail-card">
                <p className="item-description">{product.description}</p>
                <p><strong>Categoría:</strong> <span className="item-category">{product.category}</span></p>
                <p><strong>Precio:</strong> <span className="item-price">${product.price}</span></p>
                <p><strong>Stock:</strong> <span className="item-stock">{product.stock}</span></p>



                <ItemCount
                    stock={product.stock}
                    initial={1}
                    onQuantityChange={setQuantity}
                />

                <Button
                    label="Agregar al carrito"
                    icon="pi pi-shopping-cart"
                    className="neon-button"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0 || quantity === 0}
                />
            </Card>
        </div>
    );
};

export default ItemDetailContainer;