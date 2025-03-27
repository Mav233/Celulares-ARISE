//Falta avanzar para impletancion, idea en proceso.
// import React, { useEffect, useState } from 'react';


// const ItemListContainer = ({ greeting }) => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {

//         const mockProducts = [
//             { id: 1, name: 'iPhone 15 Pro', price: 1200 },
//             { id: 2, name: 'Samsung Galaxy S23', price: 1100 },
//             { id: 3, name: 'Xiaomi 13 Pro', price: 900 },
//             { id: 4, name: 'Motorola Edge 40', price: 850 }
//         ];

//         setTimeout(() => setProducts(mockProducts), 1000);
//     }, []);

//     return (
//         <div>
//             <h1>{greeting}</h1>
//             <ul>
//                 {products.length > 0 ? (
//                     products.map(product => (
//                         <li key={product.id}>{product.name} - ${product.price}</li>
//                     ))
//                 ) : (
//                     <p>Cargando productos...</p>
//                 )}
//             </ul>
//         </div>
//     );
// };

// export default ItemListContainer;
