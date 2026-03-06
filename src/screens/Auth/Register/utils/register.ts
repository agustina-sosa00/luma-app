import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/firebase/firebaseConfig';

interface RegisterData {
  nombre: string;
  apellido: string;
  telefono: string;
  provincia: string;
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  const { nombre, apellido, email, password, telefono, provincia } = data;

  try {
    // 1️⃣ crear usuario en auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;

    // 2️⃣ guardar datos adicionales en firestore
    await setDoc(doc(db, 'users', user.uid), {
      nombre,
      apellido,
      email,
      telefono,
      provincia,
      createdAt: serverTimestamp(),
    });

    // 3️⃣ enviar verificación de email
    await sendEmailVerification(user);

    return user;
  } catch (error) {
    throw error;
  }
}
