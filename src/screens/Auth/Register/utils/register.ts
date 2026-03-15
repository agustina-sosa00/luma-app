import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, db } from '@/firebase/firebaseConfig';

interface RegisterData {
  nombre: string;
  apellido: string;
  telefono: string;
  provincia: string;
  email: string;
  password: string;
  favorites: string[];
}

export async function registerUser(data: RegisterData) {
  const { nombre, apellido, email, password, telefono, provincia, favorites } = data;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;

    await set(ref(db, 'users/' + user.uid), {
      nombre: nombre,
      apellido: apellido,
      email: email,
      telefono: telefono,
      provincia: provincia,
      favorites: favorites,
    });

    await sendEmailVerification(user);
    await signOut(auth);
  } catch (error) {
    throw error;
  }
}
