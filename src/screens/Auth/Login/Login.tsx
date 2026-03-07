import { Image, Pressable, Text, View } from 'react-native';
import logo from '@assets/logoLuma.png';
import Input from '@/components/input/Input';
import Button from '@/components/buttons/Button';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';
import { loginSchema } from '@/validations/authSchema';

interface LoginProps {
  setIsLogin: (login: boolean) => void;
  setAuthUser: (authUser: boolean) => void;
}

export default function Login({ setIsLogin, setAuthUser }: LoginProps) {
  const [errors, setErrors] = useState<any>({});
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

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

  async function login(email: string, password: string) {
    try {
      await loginSchema.validate(form, { abortEarly: false });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setAuthUser(true);
      console.log('Usuario logueado:', userCredential.user);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  function onSubmit() {
    login(form.email, form.password);
  }

  return (
    <View className="w-full flex-1 items-center justify-center  bg-background p-10">
      <View className="mb-7 flex items-center">
        <Image source={logo} className="h-40 w-40" />
        <Text className="font-outfit text-3xl font-bold text-primary">Luma</Text>
      </View>
      <View className="w-full">
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
          text="Iniciar Sesión"
          containerClassName="w-full h-12 mb-7"
          onPress={onSubmit}
        />

        <View className="flex flex-row items-center justify-center gap-2">
          <Text className=" font-poppins font-medium text-textPrimary">¿No tienes cuenta?</Text>
          <Pressable
            className="flex flex-row items-center justify-center"
            onPress={() => setIsLogin(false)}>
            <Text className="font-poppinsSemiBold  text-primary">Regístrate</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
