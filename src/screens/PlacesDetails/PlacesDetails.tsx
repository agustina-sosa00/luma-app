import { ScrollView, View, Text, Image, Pressable, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Icon } from 'react-native-paper';

export default function PlaceDetails() {
  const route = useRoute<any>();
  const { place } = route.params;

  const openWebsite = () => {
    if (place.sitio_web) {
      Linking.openURL(place.sitio_web);
    }
  };

  const callPhone = () => {
    if (place.telefono) {
      Linking.openURL(`tel:${place.telefono}`);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Imagen */}
      <Image
        source={{ uri: place.portada }}
        style={{ width: '100%', height: 230 }}
        resizeMode="cover"
      />

      <View className="gap-4 p-4">
        {/* Titulo */}
        <View>
          <Text className="text-2xl font-bold">{place.nombre}</Text>
          <Text className="text-gray-500">{place.subcategoria}</Text>
        </View>

        {/* Rating */}
        <View className="flex-row items-center gap-2">
          <Icon source="star" size={20} color="#FFD700" />
          <Text className="font-semibold">{place.valoracion}</Text>
        </View>

        {/* Dirección */}
        <View className="flex-row items-center gap-2">
          <Icon source="map-marker" size={20} />
          <Text className="flex-1">{place.direccion}</Text>
        </View>

        {/* Horario */}
        <View className="flex-row items-center gap-2">
          <Icon source="clock-outline" size={20} />
          <Text>
            {place.hora_apertura} - {place.hora_cierre}
          </Text>
        </View>

        {/* Telefono */}
        {place.telefono && (
          <Pressable onPress={callPhone} className="flex-row items-center gap-2">
            <Icon source="phone" size={20} />
            <Text className="text-blue-600">{place.telefono}</Text>
          </Pressable>
        )}

        {/* Sitio web */}
        {place.sitio_web && (
          <Pressable onPress={openWebsite} className="flex-row items-center gap-2">
            <Icon source="web" size={20} />
            <Text className="text-blue-600">{place.sitio_web}</Text>
          </Pressable>
        )}

        {/* Descripción */}
        {place.descripcion && (
          <View>
            <Text className="mb-1 text-lg font-semibold">Descripción</Text>
            <Text className="text-gray-600">{place.descripcion}</Text>
          </View>
        )}

        {/* Categorías */}
        {place.categoria && (
          <View>
            <Text className="mb-2 text-lg font-semibold">Categorías</Text>

            <View className="flex-row flex-wrap gap-2">
              {place.categoria.map((cat: string, index: number) => (
                <View key={index} className="rounded-full bg-primary px-3 py-1">
                  <Text className="text-sm text-white">{cat}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Reseñas */}
        {place.comentarios?.length > 0 && (
          <View>
            <Text className="mb-2 text-lg font-semibold">Reseñas</Text>

            {place.comentarios.map((c: any, index: number) => (
              <View key={index} className="mb-3 rounded-lg bg-gray-100 p-3">
                <View className="flex-row items-center justify-between">
                  <Text className="font-semibold">{c.usuario}</Text>

                  <View className="flex-row items-center gap-1">
                    <Icon source="star" size={16} color="#FFD700" />
                    <Text>{c.valoracion}</Text>
                  </View>
                </View>

                <Text className="mt-1 text-gray-600">{c.texto}</Text>

                <Text className="mt-1 text-xs text-gray-400">{c.fecha}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
