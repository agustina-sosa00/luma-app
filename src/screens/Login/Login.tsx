import { Image, Text, View } from 'react-native';
import logo from '@assets/logoLuma.png';
import Input from '@/components/input/Input';
import Button from '@/components/buttons/Button';

interface LoginProps {
  setSession: (session: boolean) => void;
}

export default function Login({ setSession }: LoginProps) {
  return (
    <View className="flex h-full w-full items-center justify-center  bg-background p-10">
      <View className="mb-7 flex items-center">
        <Image source={logo} className="h-40 w-40" />
        <Text className="font-outfit text-3xl font-bold text-primary">Luma</Text>
      </View>
      <View className="w-full">
        <Input
          label="Usuario"
          placeholder="Agustina"
          variant="text"
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
          containerClassName="w-full h-12"
          onPress={() => setSession(true)}
        />
      </View>
    </View>
  );
}
