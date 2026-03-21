import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    alert('Error al cerrar sesión:');
  }
}
