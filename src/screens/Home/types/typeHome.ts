export interface HomeProps {
  setSession: (session: boolean) => void;
}

export interface User {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  provincia: string;
}
