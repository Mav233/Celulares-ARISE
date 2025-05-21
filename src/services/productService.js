import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

export const getProducts = async (category = null) => {
    try {
        const db = getFirestore();
        const productsCollection = collection(db, "celulares");

        let productsQuery;

        if (category) {
            productsQuery = query(productsCollection, where("category", "==", category));
        } else {
            productsQuery = productsCollection;
        }

        const querySnapshot = await getDocs(productsQuery);

        const products = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return products;
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        throw error;
    }
};
