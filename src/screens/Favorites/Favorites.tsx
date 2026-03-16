import { ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import CardPlaceHome from '@/screens/Home/components/CardPlacesHome';
import { useGetPlacesQuery } from '@/services/appServices';
import { IPlace, NavigationProp } from '@/types';
import { auth, db } from '@/firebase/firebaseConfig';
import { get, ref, set } from 'firebase/database';
import { reload } from 'firebase/auth';
import { addUser } from '@/store/app/appSlice';

export default function FavoritesScreen() {
  const navigation = useNavigation<NavigationProp>();

  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.app.user);

  const { data: placesData } = useGetPlacesQuery();

  const placesArray: IPlace[] = Object.values(placesData ?? {});

  const favoriteIds: string[] = user?.favorites ?? [];

  const favoritePlaces = placesArray.filter((place) => favoriteIds.includes(place.id));

  function handleNavigateDetails(place: IPlace, index: number) {
    navigation.navigate('PlaceDetail', { place, index });
  }

  async function getUserData() {
    const user = auth.currentUser;

    if (!user) return;

    const snapshot = await get(ref(db, 'users/' + user?.uid));

    if (snapshot.exists()) {
      const data = snapshot.val();
      dispatch(addUser(data));
    }
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

  return (
    <ScrollView className="flex-1 bg-onPrimary py-5">
      <View className="px-4">
        <Text className=" font-poppinsSemiBold text-2xl">Mis lugares favoritos</Text>
      </View>
      <View className="px-4 py-4" style={{ gap: 16 }}>
        {favoritePlaces.length === 0 ? (
          <Text className="text-center text-textSecondary">No tenés lugares favoritos todavía</Text>
        ) : (
          favoritePlaces.map((place, index) => (
            <CardPlaceHome
              key={place.id}
              place={place}
              favorite={true}
              handleNavigateDetails={() => handleNavigateDetails(place, index)}
              handleFavorite={() => addFavorite(place.id)}
              width="full"
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}
