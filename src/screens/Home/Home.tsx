import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import avatarLuma from '@assets/avatarLuma.png';
import { Icon } from 'react-native-paper';
import ButtonCategory from '@/components/buttons/ButtonCategory';
import CategoryCarousel from './components/CarouselCategories';
import CardPlaceHome from './components/CardPlacesHome';
import { logout } from '@/utils/logout';
import { auth, db } from '@/firebase/firebaseConfig';
import { useEffect, useState } from 'react';
import { ref, get, set } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '@/store/app/appSlice';
import { useGetCategoriesQuery, useGetPlacesQuery } from '@/services/appServices';
import { IPlace, NavigationProp } from '@/types';
import { useNavigation } from '@react-navigation/native';
import Menu from '@/components/Menu';

export default function Home() {
  const navigation = useNavigation<NavigationProp>();
  const userStore = useSelector((state: any) => state.app.user);
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);

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
      <View className="relative flex flex-1 gap-8 bg-onPrimary px-5 py-2">
        <View className="flex w-full flex-row  justify-between ">
          <View>
            <Text className="text-lg font-semibold text-textPrimary">
              Hola {userStore?.nombre}!
            </Text>
            <Text className=" text-base font-medium text-disabled">
              <Icon source={'map-marker'} size={16} color="#6233B9" /> Ciudad de Buenos Aires
            </Text>
          </View>

          {userStore?.image ? (
            <Pressable
              onPress={() => setOpenMenu(!openMenu)}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
              <Image
                source={userStore?.image && { uri: userStore.image }}
                className="h-full w-full rounded-full"
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => setOpenMenu(!openMenu)}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
              <Text className="font-poppinsSemiBold text-3xl text-onPrimary">
                {userStore?.nombre.charAt(0).toUpperCase()}
              </Text>
            </Pressable>
          )}
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
              <Pressable onPress={() => handleNavigateCategory(category.nombreCat)}>
                <Text className="mb-2 font-poppinsSemiBold text-sm text-textSecondary">
                  Ver más
                </Text>
              </Pressable>
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

        {openMenu && <Menu logout={logout} />}
      </View>
    </ScrollView>
  );
}
