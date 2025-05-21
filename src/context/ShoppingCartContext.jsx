import { createContext, useState } from "react";

export const CartContext = createContext(null);

export const ShippingCartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const getTotalQuantity = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const addToCart = (product) => {
        setCart((currentCart) => {
            const existingProduct = currentCart.find((item) => item.id === product.id);
            const currentQuantity = existingProduct ? existingProduct.quantity : 0;
            const newQuantity = currentQuantity + product.quantity;

            if (newQuantity > product.stock) {
                alert("No hay suficiente stock");
                return currentCart;
            }

            if (existingProduct) {
                return currentCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: newQuantity }
                        : item
                );
            } else {
                return [...currentCart, product];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCart((currentCart) => {
            return currentCart.map((item) => {
                if (item.id === productId) {
                    const newQuantity = Math.max(0, quantity);
                    if (newQuantity === 0) {
                        return null; // luego será filtrado
                    }
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }).filter(Boolean); // elimina nulls
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getTotalQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default ShippingCartProvider;
