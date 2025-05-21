import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

export const createOrder = async (orderData) => {
    try {
        const db = getFirestore();
        const ordersCollection = collection(db, "orders");

        const docRef = await addDoc(ordersCollection, {
            ...orderData,
            createdAt: serverTimestamp(),
        });

        return docRef.id;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
}