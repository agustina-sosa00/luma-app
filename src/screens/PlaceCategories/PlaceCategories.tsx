import { ScrollView, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useGetPlacesQuery } from '@/services/appServices';
import CardPlaceHome from '../Home/components/CardPlacesHome';
import { IPlace } from '@/types';

export default function PlaceCategories() {
  const route = useRoute<any>();

  const category = route.params?.category;

  const { data: placesData } = useGetPlacesQuery();

  const placesArray: IPlace[] = Object.values(placesData ?? {});

  const filteredPlaces = placesArray.filter((place) => place.categoria?.includes(category));

  return (
    <ScrollView>
      <View className="flex h-screen items-center  bg-onPrimary px-5 py-5" style={{ gap: 16 }}>
        {filteredPlaces.map((place) => (
          <CardPlaceHome
            key={place.id}
            place={place}
            favorite={false}
            width="full"
            handleFavorite={() => {}}
          />
        ))}
      </View>
    </ScrollView>
  );
}
