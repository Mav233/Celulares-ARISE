import React, { useContext } from "react";
import { CartContext } from "../context/ShoppingCartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const {
        cart,
        updateQuantity,
        removeFromCart,
        clearCart,
    } = useContext(CartContext);

    const navigate = useNavigate();

    const handleFinishPurchase = () => {
        clearCart();
        alert("¡Compra realizada con éxito!");
        navigate("/");
    };

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const formatPrice = (price) => {
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 2,
        }).format(price);
    };

    return (
        <div style={{ padding: "1rem" }}>
            <h1>Carrito de Compras</h1>
            {cart.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <>
                    <ul>
                        {cart.map((item) => (
                            <li
                                key={item.id}
                                style={{
                                    marginBottom: "1rem",
                                    borderBottom: "1px solid #ccc",
                                }}
                            >
                                <h3>{item.title}</h3>
                                <p>Precio: {formatPrice(item.price)}</p>
                                <p>
                                    Cantidad: {item.quantity}{" "}
                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item.id,
                                                item.quantity + 1
                                            )
                                        }
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item.id,
                                                item.quantity - 1
                                            )
                                        }
                                    >
                                        -
                                    </button>
                                </p>
                                <p>
                                    <strong>Subtotal:</strong>{" "}
                                    {formatPrice(item.price * item.quantity)}
                                </p>
                                <button onClick={() => removeFromCart(item.id)}>
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: {formatPrice(total)}</h3>
                    <button onClick={handleFinishPurchase}>
                        Finalizar Compra
                    </button>
                </>
            )}
        </div>
    );
};

export default CartPage;
