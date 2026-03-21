import { NavigationProp } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';
import { Icon } from 'react-native-paper';

export default function Menu({ logout }: { logout: () => void }) {
  const navigate = useNavigation<NavigationProp>();
  return (
    <View
      className="absolute right-0 top-20 z-30 flex h-32 w-60 items-end justify-evenly rounded-2xl rounded-b rounded-t-none bg-textSecondary p-4 shadow shadow-black"
      style={{ gap: 10 }}>
      <Pressable
        onPress={() => navigate.navigate('Profile')}
        className="flex w-full flex-row items-center justify-end"
        style={{ gap: 10 }}>
        <Text className="font-poppinsBold text-lg text-onPrimary">Perfil</Text>
        <Icon source="account" size={24} color="#ffffff" />
      </Pressable>
      <View className="h-0.5 w-full bg-onPrimary" />
      <Pressable
        onPress={() => logout()}
        className="flex w-full flex-row items-center justify-end"
        style={{ gap: 10 }}>
        <Text className="font-poppinsBold text-lg text-onPrimary">Cerrar Sesión</Text>
        <Icon source="logout" size={24} color="#ffffff" />
      </Pressable>
    </View>
  );
}
