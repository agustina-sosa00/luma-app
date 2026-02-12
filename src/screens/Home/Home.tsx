import { Image, Text, View } from 'react-native';
import avatarLuma from '@assets/avatarLuma.png';
import { Icon } from 'react-native-paper';
import Search from '@/components/Search/Search';
import ButtonCategory from '@/components/buttons/ButtonCategory';
export default function Home() {
  return (
    <View className="flex flex-1 gap-4 bg-onPrimary px-5 py-2">
      <View className="flex h-16 w-full flex-row justify-between">
        <View>
          <Text className="text-lg font-semibold text-textPrimary">Hola Agus!</Text>
          <Text className=" text-base font-medium text-disabled">
            <Icon source={'map-marker'} size={16} color="#6233B9" /> Ciudad de Buenos Aires
          </Text>
        </View>
        <Image source={avatarLuma} className="h-16 w-16 rounded-full" />
      </View>
      <View className="flex h-16 w-full justify-center">
        <Search
          handleClean={() => console.log('')}
          onChange={() => console.log('')}
          inputName=""
          isSearching
        />
      </View>
      <View className="flex h-16 w-full flex-row justify-between">
        <ButtonCategory textButton="Café" sourceIcon={'coffee'} sizeIcon={24} />
      </View>
    </View>
  );
}
