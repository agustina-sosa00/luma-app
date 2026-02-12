import Button from '@/components/buttons/Button';
import Input from '@/components/input/Input';
import { Pressable, Text, View } from 'react-native';

interface RegisterProps {
  setIsLogin: (login: boolean) => void;
}

export default function Register({ setIsLogin }: RegisterProps) {
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
        />
        <Input
          label="Apellido"
          placeholder="Sosa"
          variant="text"
          containerClassName="w-full mb-7"
        />

        <View className="flex flex-row gap-2">
          <Input
            label="Provincia / Ciudad"
            placeholder="Buenos Aires"
            variant="email"
            containerClassName="flex-1 mb-7"
          />
          <Input
            label="Teléfono"
            placeholder="1123465789"
            variant="text"
            containerClassName="flex-1 mb-7"
          />
        </View>

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

        <Button variant="primary" text="Registrate" containerClassName="w-full h-12 mb-7" />

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
