import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.log('Error al cerrar sesión:', error);
  }
}
