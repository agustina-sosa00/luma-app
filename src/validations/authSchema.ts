import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Email inválido').required('El email es obligatorio'),

  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
});

export const registerSchema = yup.object({
  nombre: yup
    .string()
    .required('El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),

  apellido: yup
    .string()
    .required('El apellido es obligatorio')
    .min(3, 'El apellido debe tener al menos 3 caracteres'),

  telefono: yup.string().min(8, 'Número inválido'),

  provincia: yup
    .string()
    .required('La provincia es obligatoria')
    .min(3, 'La provincia debe tener al menos 3 caracteres'),

  email: yup.string().email('Email inválido').required('El email es obligatorio'),

  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
});
