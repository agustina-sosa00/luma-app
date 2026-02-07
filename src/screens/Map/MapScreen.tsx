import { Text, View } from 'react-native';
import Search from '@/components/Search/Search';
import { useUserLocation } from '@/hooks/useUserLocation';
import MapView, { Marker } from 'react-native-maps';
import { ActivityIndicator } from 'react-native-paper';
import { useState } from 'react';
import CardPlace from './components/CardPlace';
export default function MapScreen() {
  const { location, loading, error } = useUserLocation();
  const [selectPlace, setSelectPlace] = useState();
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

  function handleOpenCard({ place }: any) {
    setSelectPlace(place);
  }
  return (
    <View style={{ flex: 1 }} className="w-full ">
      <View className="absolute  top-4 z-10 flex w-full items-center px-10 ">
        <Search
          placeholder="Buscar..."
          onChange={() => {}}
          inputName=""
          handleClean={() => {}}
          handleOnSearch={() => {}}
          isSearching={false}
        />
      </View>

      <MapView
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
            // latitude: location.latitude,
            // longitude: location.longitude,
            latitude: -34.583333,
            longitude: -58.416667,
          }}
          title="Mi ubicación"
        />
        {MOCK_PLACES.map((place) => (
          <Marker
            key={place.id}
            coordinate={place.ubicacion}
            title={place.name}
            description={place.categoria}
            onPress={() => handleOpenCard({ place })}
          />
        ))}
      </MapView>

      {selectPlace && <CardPlace place={selectPlace} />}
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
