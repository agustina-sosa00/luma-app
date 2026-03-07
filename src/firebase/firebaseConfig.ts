import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAhkFiVjRDgGjlEqQaCdd_j_vn75CO3frU',
  authDomain: 'lumaapp-26.firebaseapp.com',
  databaseURL: 'https://lumaapp-26-default-rtdb.firebaseio.com',
  projectId: 'lumaapp-26',
  storageBucket: 'lumaapp-26.firebasestorage.app',
  messagingSenderId: '1033478679881',
  appId: '1:1033478679881:web:9326f34a29a9775ce9be98',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
