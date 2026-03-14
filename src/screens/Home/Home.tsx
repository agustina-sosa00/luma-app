import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import avatarLuma from '@assets/avatarLuma.png';
import { Icon } from 'react-native-paper';
import Search from '@/components/Search/Search';
import ButtonCategory from '@/components/buttons/ButtonCategory';
import CategoryCarousel from './components/CarouselCategories';
import CardPlaceHome from './components/CardPlacesHome';
import { logout } from '@/utils/logout';
import { auth, db } from '@/firebase/firebaseConfig';
import { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { HomeProps, User } from './types/typeHome';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '@/store/app/appSlice';
import { useGetCategoriesQuery } from '@/services/appServices';

export default function Home({ setSession }: HomeProps) {
  const userStore = useSelector((state: any) => state.app.user);
  const dispatch = useDispatch();

  const { data: categories } = useGetCategoriesQuery();

  const [userData, setUserData] = useState<User | null>(null);
  const MOCK_PLACES = [
    {
      id: '1',
      name: 'Café Morta',
      direccion: 'Calle Falsa 123',
      categoria: 'cafe',
      ubicacion: {
        latitude: -34.583981,
        longitude: -58.410234,
      },
    },
    {
      id: '2',
      name: 'Burger House',
      direccion: 'Calle Falsa 123',
      categoria: 'restaurant',
      ubicacion: {
        latitude: -34.584512,
        longitude: -58.412801,
      },
    },
    {
      id: '3',
      name: 'Cine Palermo',
      direccion: 'Calle Falsa 123',
      categoria: 'cine',
      ubicacion: {
        latitude: -34.582144,
        longitude: -58.40899,
      },
    },
  ];

  async function getUserData() {
    const user = auth.currentUser;

    if (!user) return;

    const snapshot = await get(ref(db, 'users/' + user?.uid));

    if (snapshot.exists()) {
      const data = snapshot.val();
      dispatch(addUser(data));
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <ScrollView className="flex-1 bg-onPrimary" showsVerticalScrollIndicator={false}>
      <View className="flex flex-1 gap-8 bg-onPrimary px-5 py-2">
        <View className="flex w-full flex-row  justify-between ">
          <View>
            <Text className="text-lg font-semibold text-textPrimary">
              Hola {userStore?.nombre}!
            </Text>
            <Text className=" text-base font-medium text-disabled">
              <Icon source={'map-marker'} size={16} color="#6233B9" /> Ciudad de Buenos Aires
            </Text>
          </View>

          <Pressable onPress={() => logout()}>
            <Text className="text-lg font-semibold text-textPrimary">Cerrar Sesión</Text>
          </Pressable>
          <Image source={avatarLuma} className="h-16 w-16 rounded-full" />
        </View>
        <View className="flex h-16 w-full justify-center ">
          <Search
            handleClean={() => console.log('')}
            onChange={() => console.log('')}
            value=""
            isSearching={false}
          />
        </View>
        <CategoryCarousel>
          {categories?.map((category: any) => (
            <ButtonCategory
              key={category.id}
              textButton={category.nombreCat}
              sourceIcon={category.icono}
              sizeIcon={24}
            />
          ))}
        </CategoryCarousel>
        <View className="w-full ">
          <View className="flex w-full flex-row items-center justify-between">
            <Text className="mb-2 font-poppinsSemiBold text-2xl">Café</Text>
            <Text className="mb-2 font-poppinsSemiBold text-sm text-textSecondary">Ver más</Text>
          </View>
          <CategoryCarousel>
            {MOCK_PLACES.map((place) => (
              <CardPlaceHome key={place.id} place={place} />
            ))}
          </CategoryCarousel>
        </View>
        <View className="w-full ">
          <View className="flex w-full flex-row items-center justify-between">
            <Text className="mb-2 font-poppinsSemiBold text-2xl">Café</Text>
            <Text className="mb-2 font-poppinsSemiBold text-sm text-textSecondary">Ver más</Text>
          </View>
          <CategoryCarousel>
            {MOCK_PLACES.map((place) => (
              <CardPlaceHome key={place.id} place={place} />
            ))}
          </CategoryCarousel>
        </View>
        <View className="w-full ">
          <View className="flex w-full flex-row items-center justify-between">
            <Text className="mb-2 font-poppinsSemiBold text-2xl">Café</Text>
            <Text className="mb-2 font-poppinsSemiBold text-sm text-textSecondary">Ver más</Text>
          </View>
          <CategoryCarousel>
            {MOCK_PLACES.map((place) => (
              <CardPlaceHome key={place.id} place={place} />
            ))}
          </CategoryCarousel>
        </View>
      </View>
    </ScrollView>
  );
}
