import Button from '@/components/buttons/Button';
import Input from '@/components/input/Input';
import { Pressable, Text, View } from 'react-native';
import { useState } from 'react';
import { registerUser } from './utils/register';

interface RegisterProps {
  setIsLogin: (login: boolean) => void;
}

export default function Register({ setIsLogin }: RegisterProps) {
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
      console.log(error.message);
    }
  }

  function handleOnChange(field: string, value: string) {
    setForm({
      ...form,
      [field]: value,
    });
  }

  return (
    <View className="flex h-full w-full items-center justify-center  bg-background p-10">
      <View className="mb-7 flex flex-row items-center">
        <Text className="font-outfit text-3xl font-bold text-primary">Crea tu cuenta</Text>
      </View>
      <View className="w-full">
        <Input
          label="Nombre"
          placeholder="Agustina"
          variant="text"
          containerClassName="w-full mb-7"
          value={form.nombre}
          onChangeText={(text) => handleOnChange('nombre', text)}
        />
        <Input
          label="Apellido"
          placeholder="Sosa"
          variant="text"
          containerClassName="w-full mb-7"
          value={form.apellido}
          onChangeText={(text) => handleOnChange('apellido', text)}
        />

        <View className="flex flex-row gap-2">
          <Input
            label="Provincia / Ciudad"
            placeholder="Buenos Aires"
            variant="email"
            containerClassName="flex-1 mb-7"
            value={form.provincia}
            onChangeText={(text) => handleOnChange('provincia', text)}
          />
          <Input
            label="Teléfono"
            placeholder="1123465789"
            variant="text"
            containerClassName="flex-1 mb-7"
            value={form.telefono}
            onChangeText={(text) => handleOnChange('telefono', text)}
          />
        </View>

        <Input
          label="Correo Electrónico"
          placeholder="micorreo@gmail.com"
          variant="email"
          containerClassName=" w-full mb-7"
          value={form.email}
          onChangeText={(text) => handleOnChange('email', text)}
        />

        <Input
          label="Contraseña"
          placeholder="********"
          variant="password"
          containerClassName=" w-full mb-7"
          value={form.password}
          onChangeText={(text) => handleOnChange('password', text)}
        />

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
