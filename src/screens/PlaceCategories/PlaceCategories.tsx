import { ScrollView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetPlacesQuery } from '@/services/appServices';
import CardPlaceHome from '../Home/components/CardPlacesHome';
import { IPlace, NavigationProp } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from '@/firebase/firebaseConfig';
import { get, ref, set } from 'firebase/database';
import { addUser } from '@/store/app/appSlice';

export default function PlaceCategories() {
  const route = useRoute<any>();
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const userStore = useSelector((state: any) => state.app.user);

  const category = route.params?.category;

  const { data: placesData } = useGetPlacesQuery();

  const placesArray: IPlace[] = Object.values(placesData ?? {});

  const filteredPlaces = placesArray.filter((place) => place.categoria?.includes(category));

  function handleNavigateDetails({ place, index }: { place: IPlace; index: number }) {
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
    <ScrollView className="flex-1 bg-onPrimary" showsVerticalScrollIndicator={false}>
      <View className="flex flex-1 items-center  bg-onPrimary px-5 py-5" style={{ gap: 16 }}>
        {filteredPlaces.map((place, index) => {
          const favorite = userStore?.favorites?.includes(place.id);
          return (
            <CardPlaceHome
              key={place.id}
              place={place}
              favorite={favorite}
              width="full"
              handleFavorite={addFavorite}
              handleNavigateDetails={() => handleNavigateDetails({ place, index })}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}
