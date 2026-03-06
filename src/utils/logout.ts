import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';

export async function logout(setSession: any) {
  try {
    await signOut(auth);
    setSession(false);
    console.log('Sesión cerrada');
  } catch (error) {
    console.log('Error al cerrar sesión:', error);
  }
}
