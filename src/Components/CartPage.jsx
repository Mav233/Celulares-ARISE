import React, { useContext } from "react";
import { CartContext } from "../context/ShoppingCartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";

const CartPage = () => {
    const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const formatPrice = (price) => {
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 2,
        }).format(price);
    };

    return (
        <div className="cart-page">
            <h1 className="cart-title">Carrito de Compras</h1>

            {cart.length === 0 ? (
                <p className="cart-empty-message">Tu carrito está vacío.</p>
            ) : (
                <>
                    <ul className="cart-list">
                        {cart.map((item) => (
                            <li key={item.id} className="cart-item">
                                <Card className="cart-item-card">
                                    <h3 className="item-title">{item.title}</h3>
                                    <p className="item-price">Precio: {formatPrice(item.price)}</p>

                                    <div className="item-quantity">
                                        <span>Cantidad: {item.quantity}</span>{" "}
                                        <Button
                                            icon="pi pi-plus"
                                            rounded
                                            text
                                            className="quantity-btn"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        />
                                        <Button
                                            icon="pi pi-minus"
                                            rounded
                                            text
                                            className="quantity-btn"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        />
                                    </div>

                                    <p className="item-subtotal">
                                        <strong>Subtotal:</strong> {formatPrice(item.price * item.quantity)}
                                    </p>

                                    <Button
                                        label="Eliminar"
                                        icon="pi pi-trash"
                                        severity="danger"
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item.id)}
                                    />
                                </Card>
                            </li>
                        ))}
                    </ul>

                    <Divider />

                    <h3 className="cart-total">Total: {formatPrice(total)}</h3>

                    <Button
                        label="Finalizar Compra"
                        icon="pi pi-check"
                        className="finish-btn"
                        onClick={() => navigate("/checkout")}
                    />
                </>
            )}
        </div>
    );
};

export default CartPage;