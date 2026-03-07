import Button from '@/components/buttons/Button';
import Input from '@/components/input/Input';
import { Pressable, Text, View } from 'react-native';
import { useState } from 'react';
import { registerUser } from './utils/register';
import { registerSchema } from '@/validations/authSchema';

interface RegisterProps {
  setIsLogin: (login: boolean) => void;
}

export default function Register({ setIsLogin }: RegisterProps) {
  const [errors, setErrors] = useState<any>({});
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    provincia: '',
    email: '',
    password: '',
  });

  async function handleRegister() {
    try {
      setErrors({});
      await registerSchema.validate(form, { abortEarly: false });
      await registerUser({
        nombre: form.nombre,
        apellido: form.apellido,
        telefono: form.telefono,
        provincia: form.provincia,
        email: form.email,
        password: form.password,
      });
      alert('Cuenta creada. Verificá tu email.');
      setIsLogin(true);
    } catch (error: any) {
      if (error.inner) {
        const newErrors: any = {};

        error.inner.forEach((err: any) => {
          newErrors[err.path] = err.message;
        });

        setErrors(newErrors);
      }
    }
  }

  function handleOnChange(field: string, value: string) {
    setForm({
      ...form,
      [field]: value,
    });

    setErrors({
      ...errors,
      [field]: '',
    });
  }

  return (
    <View className="flex h-full w-full items-center justify-center  bg-background p-10">
      <View className="mb-7 flex flex-row items-center">
        <Text className="font-outfit text-3xl font-bold text-primary">Crea tu cuenta</Text>
      </View>
      <View className="w-full">
        <View className="mb-4">
          <Input
            label="Nombre"
            placeholder="Agustina"
            variant="text"
            containerClassName="w-full"
            value={form.nombre}
            onChangeText={(text) => handleOnChange('nombre', text)}
          />
          {errors.nombre && <Text className=" text-sm text-red-500">{errors.nombre}</Text>}
        </View>

        <View className="mb-4">
          <Input
            label="Apellido"
            placeholder="Sosa"
            variant="text"
            containerClassName="w-full"
            value={form.apellido}
            onChangeText={(text) => handleOnChange('apellido', text)}
          />
          {errors.password && <Text className=" text-sm text-red-500">{errors.apellido}</Text>}
        </View>

        <View className="flex flex-row gap-2">
          <View className="mb-4 flex-1">
            <Input
              label="Provincia / Ciudad"
              placeholder="Buenos Aires"
              variant="email"
              containerClassName=""
              value={form.provincia}
              onChangeText={(text) => handleOnChange('provincia', text)}
            />
            {errors.provincia && <Text className="text-sm text-red-500">{errors.provincia}</Text>}
          </View>
          <View className="mb-4 flex-1">
            <Input
              label="Teléfono"
              placeholder="1123465789"
              variant="text"
              containerClassName=""
              value={form.telefono}
              onChangeText={(text) => handleOnChange('telefono', text)}
            />
            {errors.password && <Text className=" text-sm text-red-500">{errors.telefono}</Text>}
          </View>
        </View>
        <View className="mb-4">
          <Input
            label="Correo Electrónico"
            placeholder="micorreo@gmail.com"
            variant="email"
            containerClassName=" w-full"
            value={form.email}
            onChangeText={(text) => handleOnChange('email', text)}
          />
          {errors.email && <Text className="text-sm text-red-500">{errors.email}</Text>}
        </View>

        <View className="mb-4">
          <Input
            label="Contraseña"
            placeholder="********"
            variant="password"
            containerClassName=" w-full"
            value={form.password}
            onChangeText={(text) => handleOnChange('password', text)}
          />
          {errors.password && <Text className="text-sm text-red-500">{errors.password}</Text>}
        </View>

        <Button
          variant="primary"
          text="Registrate"
          containerClassName="w-full h-12 mb-7"
          onPress={handleRegister}
        />

        <Pressable
          className="flex w-full flex-row items-center justify-center"
          onPress={() => setIsLogin(true)}>
          <Text className="mr-1 font-poppins font-medium text-textPrimary">Ya tienes cuenta?</Text>
          <Text className="font-poppinsSemiBold  text-primary">Inicia Sesión</Text>
        </Pressable>
      </View>
    </View>
  );
}
