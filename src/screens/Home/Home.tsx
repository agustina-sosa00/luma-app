import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import avatarLuma from '@assets/avatarLuma.png';
import { Icon } from 'react-native-paper';
import ButtonCategory from '@/components/buttons/ButtonCategory';
import CategoryCarousel from './components/CarouselCategories';
import CardPlaceHome from './components/CardPlacesHome';
import { logout } from '@/utils/logout';
import { auth, db } from '@/firebase/firebaseConfig';
import { useEffect } from 'react';
import { ref, get, set } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '@/store/app/appSlice';
import { useGetCategoriesQuery, useGetPlacesQuery } from '@/services/appServices';
import { IPlace, NavigationProp } from '@/types';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation<NavigationProp>();
  const userStore = useSelector((state: any) => state.app.user);
  const dispatch = useDispatch();

  console.log('user en el home-------->', userStore);

  const { data: categories } = useGetCategoriesQuery();

  const { data: placesData } = useGetPlacesQuery();
  const placesArray: IPlace[] = Object.values(placesData ?? {});

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const user = auth.currentUser;

    if (!user) return;

    const snapshot = await get(ref(db, 'users/' + user?.uid));

    if (snapshot.exists()) {
      const data = snapshot.val();
      dispatch(addUser(data));
    }
  }

  function handleNavigateDetails({ place, index }: { place: IPlace; index: number }) {
    navigation.navigate('PlaceDetail', { place, index });
  }

  async function addFavorite(placeId: string) {
    const user = auth.currentUser;
    if (!user) return;

    const favoritesRef = ref(db, `users/${user.uid}/favorites`);

    const snapshot = await get(favoritesRef);

    let favorites: string[] = snapshot.exists() ? snapshot.val() : [];

    if (favorites.includes(placeId)) {
      favorites = favorites.filter((id) => id !== placeId);
    } else {
      favorites.push(placeId);
    }

    await set(favoritesRef, favorites);

    getUserData();
  }

  function handleNavigateCategory(category: string) {
    navigation.navigate('PlaceCategories', { category });
  }

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

        <CategoryCarousel>
          {categories?.map((category: any) => (
            <ButtonCategory
              key={category.id}
              textButton={category.nombreCat}
              sourceIcon={category.icono}
              sizeIcon={24}
              onPress={() => handleNavigateCategory(category.nombreCat)}
            />
          ))}
        </CategoryCarousel>
        {categories?.map((category: any) => (
          <View key={category.id} className="w-full">
            <View className="flex w-full flex-row items-center justify-between">
              <Text className="mb-2 font-poppinsSemiBold text-2xl">{category.nombreCat}</Text>
              <Text className="mb-2 font-poppinsSemiBold text-sm text-textSecondary">Ver más</Text>
            </View>

            <CategoryCarousel>
              {placesArray
                .filter((place) => place.categoria?.includes(category.nombreCat))
                .map((place, index) => {
                  const favorite = userStore?.favorites?.includes(place.id);
                  return (
                    <CardPlaceHome
                      key={place.id}
                      place={place}
                      handleNavigateDetails={() => handleNavigateDetails({ place, index })}
                      handleFavorite={addFavorite}
                      favorite={favorite}
                    />
                  );
                })}
            </CategoryCarousel>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
