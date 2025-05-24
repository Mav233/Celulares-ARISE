import React, { useState, useContext, useRef } from "react";
import { CartContext } from "../context/ShoppingCartContext";
import { cartOrder } from "../services/orderService";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";

const CheckoutPage = () => {
    const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const toast = useRef(null);
    const navigate = useNavigate();

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !apellido || !email || !isValidEmail(email)) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Por favor completa todos los campos correctamente.",
                life: 3000,
            });
            return;
        }

        try {
            const orderData = {
                buyer: { nombre, apellido, email },
                items: cart,
                total: calculateTotal(),
            };

            const orderId = await cartOrder(orderData);

            toast.current.show({
                severity: "success",
                summary: "Orden creada",
                detail: `Tu orden fue creada con el ID: ${orderId}`,
                life: 4000,
            });

            clearCart();
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            console.error("Error al crear la orden:", error);
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Hubo un error al crear la orden",
                life: 3000,
            });
        }
    };

    const formatPrice = (price) =>
        new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
        }).format(price);

    return (
        <div className="checkout-page p-4 max-w-4xl mx-auto">
            <Toast ref={toast} />

            <h1 className="text-3xl font-bold mb-6 text-center">Finalizar Compra</h1>

            {cart.length === 0 ? (
                <p className="text-center text-lg text-gray-600">Tu carrito está vacío.</p>
            ) : (
                <>
                    <ul className="space-y-4 mb-8">
                        {cart.map((item) => (
                            <li key={item.id}>
                                <Card className="shadow-md p-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-semibold text-xl">{item.title}</h3>
                                            <p>Precio: {formatPrice(item.price)}</p>
                                            <p>
                                                Cantidad: {item.quantity}{" "}
                                                <Button
                                                    icon="pi pi-plus"
                                                    text
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                />
                                                <Button
                                                    icon="pi pi-minus"
                                                    text
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                />
                                            </p>
                                            <p>
                                                <strong>Subtotal:</strong> {formatPrice(item.price * item.quantity)}
                                            </p>
                                        </div>
                                        <Button
                                            icon="pi pi-trash"
                                            severity="danger"
                                            onClick={() => removeFromCart(item.id)}
                                            label="Eliminar"
                                        />
                                    </div>
                                </Card>
                            </li>
                        ))}
                    </ul>

                    <Divider />

                    <h2 className="text-xl font-semibold mb-4">Datos del comprador</h2>

                    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                        <div>
                            <label className="block mb-1">Nombre</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Apellido</label>
                            <input
                                type="text"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <p className="text-lg mt-4">
                            <strong>Total a pagar:</strong> {formatPrice(calculateTotal())}
                        </p>

                        <Button type="submit" label="Enviar Orden" className="w-full bg-blue-600 text-white" />
                    </form>
                </>
            )}
        </div>
    );
};

export default CheckoutPage;
