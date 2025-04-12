import { collection, addDoc, serverTimestamp, Timestamp, FieldValue } from 'firebase/firestore';
import { db } from './firebaseConfig';
import type { CartItem } from './cartStore';

export interface Order {
  items: CartItem[];
  totalAmount: number;
  orderDate: Timestamp | Date | FieldValue;
}

export async function saveOrder(items: CartItem[], totalAmount: number): Promise<string> {
  try {
    const orderData: Order = {
      items,
      totalAmount,
      orderDate: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, 'ordenes'), orderData);
    console.log('Orden guardada con ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error al guardar la orden:', error);
    throw error;
  }
}