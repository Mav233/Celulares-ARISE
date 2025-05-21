import React, { useState, useContext, useRef } from 'react';
import { CartContex } from '../context/ShoppingCartContex';
import { cartOrder } from '../services/orderService';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';

const ContactForm = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const { cart, clearCart } = useContext(CartContex);
    const toast = useRef(null);
    const navigate = useNavigate();

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !apellido || !email) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Por favor completa todos los campos',
                life: 3000
            });
            return;
        }

        try {
            const orderData = {
                buyer: { nombre, apellido, email },
                items: cart,
                total: calculateTotal()
            };

            const orderId = await cartOrder(orderData);

            toast.current.show({
                severity: 'success',
                summary: 'Orden creada',
                detail: `Tu orden fue creada con el ID: ${orderId}`,
                life: 3000
            });

            clearCart();
            navigate('/');
        } catch (error) {
            console.error("Error al crear la orden:", error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Hubo un error al crear la orden',
                life: 3000
            });
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <Toast ref={toast} />
            <h2 className="text-2xl font-bold mb-4">Formulario de Contacto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Apellido</label>
                    <input
                        type="text"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Enviar Orden
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
