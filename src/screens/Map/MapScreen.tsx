import { Pressable, Text, View } from 'react-native';
import Search from '@/components/Search/Search';
import { useUserLocation } from '@/hooks/useUserLocation';
import MapView, { Marker } from 'react-native-maps';
import { ActivityIndicator, Icon } from 'react-native-paper';
import { useEffect, useRef, useState } from 'react';
import CardPlace from './components/CardPlace';
import { useGetCategoriesQuery, useGetPlacesQuery } from '@/services/appServices';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@/types';
import Button from '@/components/buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryFilter } from '@/store/app/appSlice';

export default function MapScreen() {
  const mapRef = useRef<MapView | null>(null);

  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const { location, loading, error } = useUserLocation();
  const [selectPlace, setSelectPlace] = useState();
  const [openFilter, setOpenFilter] = useState(false);

  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();

  const { data: places } = useGetPlacesQuery();
  const { data: categories } = useGetCategoriesQuery();
  const selectedCategory = useSelector((state: any) => state.app.category);

  const filteredPlaces = selectedCategory
    ? places?.filter((place: any) =>
        place.categoria?.some((cat: string) => cat.toLowerCase() === selectedCategory)
      )
    : places;

  console.log('selected category -->>>>>>>>>>>>', selectedCategory);
  console.log('place', places);

  const coordinates =
    filteredPlaces?.map((place: any) => ({
      latitude: place.latitud,
      longitude: place.longitud,
    })) || [];

  useEffect(() => {
    if (!mapRef.current || coordinates.length === 0) return;

    mapRef.current.fitToCoordinates(coordinates, {
      edgePadding: {
        top: 100,
        right: 100,
        bottom: 100,
        left: 100,
      },
      animated: true,
    });
  }, [coordinates]);

  function handleOpenCard({ place }: any) {
    setSelectPlace(place);
  }

  function handleSearch() {
    setSearching(true);
  }

  function handleClear() {
    setSearch('');
    setSearching(false);
  }

  function handleNavigateDetails() {
    navigation.navigate('PlaceDetail', { place: selectPlace });
  }

  function handleOpenFilter() {
    setOpenFilter(!openFilter);
  }

  function handleSelectCategory(category: any) {
    if (!category) {
      dispatch(setCategoryFilter(null));
    } else {
      dispatch(setCategoryFilter(category.nombreCat.toLowerCase()));
    }

    setOpenFilter(false);
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (error || !location) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>No se pudo obtener la ubicación</Text>
      </View>
    );
  }

  console.log('searching: --->>>>', !searching);
  console.log('filteredPlaces: --->>>>', filteredPlaces);
  return (
    <View style={{ flex: 1 }} className="w-full ">
      <View className="absolute  top-4 z-10 flex w-full flex-row items-center gap-1 px-4 ">
        <Search
          placeholder="Buscar..."
          onChange={setSearch}
          value={search}
          handleClean={handleClear}
          handleOnSearch={handleSearch}
          isSearching={searching}
          buttonClean
        />
        <Button
          variant="secondary"
          icon={<Icon source={'filter'} size={20} color="#6233B9" />}
          containerClassName="h-12"
          onPress={handleOpenFilter}
        />
      </View>

      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        // customMapStyle={mapStyle}>
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
            // latitude: -34.583333,
            // longitude: -58.416667,
          }}
          title="Mi ubicación"
        />
        {filteredPlaces?.map((place: any) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.latitud,
              longitude: place.longitud,
            }}
            title={place.nombre}
            description={place?.subcategoria}
            onPress={() => handleOpenCard({ place })}
          />
        ))}
      </MapView>

      {selectPlace && (
        <CardPlace place={selectPlace} handleNavigateDetails={handleNavigateDetails} />
      )}

      {openFilter && (
        <View className="absolute right-4 top-20">
          <View className="flex w-60 items-end gap-6 rounded-lg bg-primary px-4 py-4 shadow shadow-disabled">
            <Pressable
              className="flex flex-row items-center gap-2"
              onPress={() => handleSelectCategory(null)}>
              <Text className="text-lg font-semibold text-onPrimary">Todos</Text>
              <Icon source="apps" size={24} color="#ffffff" />
            </Pressable>
            {categories?.map((category: any) => (
              <Pressable
                key={category.id}
                className="flex flex-row items-center gap-2"
                onPress={() => handleSelectCategory(category)}>
                <Text className="text-lg font-semibold text-onPrimary">{category.nombreCat}</Text>
                <Icon source={category.icono} size={24} color="#ffffff" />
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

// export const mapStyle = [
//   {
//     elementType: 'geometry',
//     stylers: [{ color: '#f5f5f5' }],
//   },
//   {
//     elementType: 'labels.icon',
//     stylers: [{ visibility: 'off' }],
//   },
//   {
//     elementType: 'labels.text.fill',
//     stylers: [{ color: '#616161' }],
//   },
//   {
//     featureType: 'water',
//     elementType: 'geometry',
//     stylers: [{ color: '#6233B9' }],
//   },
// ];
