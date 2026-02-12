import { Image, Pressable, Text, View } from 'react-native';
import logo from '@assets/logoLuma.png';
import Input from '@/components/input/Input';
import Button from '@/components/buttons/Button';

interface LoginProps {
  setSession: (session: boolean) => void;
  setIsLogin: (login: boolean) => void;
}

export default function Login({ setSession, setIsLogin }: LoginProps) {
  return (
    <View className="w-full flex-1 items-center justify-center  bg-background p-10">
      <View className="mb-7 flex items-center">
        <Image source={logo} className="h-40 w-40" />
        <Text className="font-outfit text-3xl font-bold text-primary">Luma</Text>
      </View>
      <View className="w-full">
        <Input
          label="Correo Electrónico"
          placeholder="micorreo@gmail.com"
          variant="email"
          containerClassName=" w-full mb-7"
        />
        <Input
          label="Contraseña"
          placeholder="********"
          variant="password"
          containerClassName=" w-full mb-7"
        />

        <Button
          variant="primary"
          text="Iniciar Sesión"
          containerClassName="w-full h-12 mb-7"
          onPress={() => setSession(true)}
        />

        <Pressable
          className="flex w-full flex-row items-center justify-center"
          onPress={() => setIsLogin(false)}>
          <Text className="mr-1 font-poppins font-medium text-textPrimary">¿No tienes cuenta?</Text>
          <Text className="font-poppinsSemiBold  text-primary">Regístrate</Text>
        </Pressable>
      </View>
    </View>
  );
}
