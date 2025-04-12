import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB5uzg63T0KqG_ipM85ThyUqsDA5jS4S10",
  authDomain: "tiendamaquetas.firebaseapp.com",
  projectId: "tiendamaquetas",
  storageBucket: "tiendamaquetas.firebasestorage.app",
  messagingSenderId: "547568844595",
  appId: "1:547568844595:web:a204f007887d8948e60846"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
