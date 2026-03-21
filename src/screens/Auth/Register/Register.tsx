import Button from '@/components/buttons/Button';
import Input from '@/components/input/Input';
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';
import { useState } from 'react';
import { registerUser } from './utils/register';
import { registerSchema } from '@/validations/authSchema';

interface RegisterProps {
  setIsLogin: (login: boolean) => void;
}

export default function Register({ setIsLogin }: RegisterProps) {
  const [errors, setErrors] = useState<any>({});
  const [loader, setLoader] = useState<boolean>(false);
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
      setLoader(true);
      setErrors({});
      await registerSchema.validate(form, { abortEarly: false });
      await registerUser({
        nombre: form.nombre,
        apellido: form.apellido,
        telefono: form.telefono,
        provincia: form.provincia,
        email: form.email,
        password: form.password,
        favorites: [],
      });
      setLoader(false);
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
      setLoader(false);
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <View className="flex h-full w-full items-center justify-center  bg-background p-10">
        <View className="mb-7 flex flex-row items-center">
          <Text className="font-outfit text-3xl font-bold text-primary">Crea tu cuenta</Text>
        </View>
        <View className="w-full">
          <View className="mb-4">
            <Input
              label="Nombre"
              placeholder="Ingresá tu nombre"
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
              placeholder="Ingresá tu apellido"
              variant="text"
              containerClassName="w-full"
              value={form.apellido}
              onChangeText={(text) => handleOnChange('apellido', text)}
            />
            {errors.apellido && <Text className=" text-sm text-red-500">{errors.apellido}</Text>}
          </View>

          <View className="flex flex-row gap-2">
            <View className="mb-4 flex-1">
              <Input
                label="Provincia / Ciudad"
                placeholder="Ingresá tu prov o ciudad"
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
                placeholder="Ingresá tu teléfono"
                variant="text"
                containerClassName=""
                value={form.telefono}
                onChangeText={(text) => handleOnChange('telefono', text)}
              />
              {errors.telefono && <Text className=" text-sm text-red-500">{errors.telefono}</Text>}
            </View>
          </View>
          <View className="mb-4">
            <Input
              label="Correo Electrónico"
              placeholder="Ingresá tu correo"
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
              placeholder="Ingresá tu contraseña"
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
            loader={loader}
          />

          <Pressable
            className="flex w-full flex-row items-center justify-center"
            onPress={() => setIsLogin(true)}>
            <Text className="mr-1 font-poppins font-medium text-textPrimary">
              Ya tienes cuenta?
            </Text>
            <Text className="font-poppinsSemiBold  text-primary">Inicia Sesión</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
