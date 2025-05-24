import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from '../FireBase/firebaseConfig.js';
import ItemList from './ItemList.jsx';
import Loading from './Loading.jsx';
import '../styles/styles.css';

const ItemListContainer = () => {
    const { categoriaId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductos = async () => {
            setLoading(true);
            try {
                const productosRef = collection(db, 'celulares');
                let q = productosRef;

                if (categoriaId) {
                    q = query(productosRef, where('category', '==', capitalize(categoriaId)));
                }

                const querySnapshot = await getDocs(q);
                const productosData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setProducts(productosData);
            } catch (error) {
                console.error('Error al obtener productos desde Firebase:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, [categoriaId]);

    const capitalize = (str) =>
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    return (
        <div className="item-list-container">
            {loading ? <Loading /> : <ItemList products={products} />}
        </div>
    );
};

export default ItemListContainer;