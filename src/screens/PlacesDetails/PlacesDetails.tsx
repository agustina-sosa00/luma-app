import {
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  Linking,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Divider, Icon } from 'react-native-paper';
import Input from '@/components/input/Input';
import { useEffect, useState } from 'react';
import StarRating from 'react-native-star-rating-widget';
import Button from '@/components/buttons/Button';
import useHandleModal from '@/hooks/useHandleModal';
import FilePicker from './FilePicker';
import { FileType } from '@/types';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import * as ImagePicker from 'expo-image-picker';
export default function PlaceDetails() {
  const route = useRoute<any>();
  const { place, index } = route.params;
  const [placeData, setPlaceData] = useState(place);

  const { isOpen, openModal, closeModal, modalKey } = useHandleModal();

  const [file, setFile] = useState<FileType | null>(null);

  const [review, setReview] = useState({
    fecha: '',
    texto: '',
    usuario: '',
    valoracion: 0,
  });

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

  useEffect(() => {
    const db = getDatabase();
    const placeRef = ref(db, `places/${index}`);

    const unsubscribe = onValue(placeRef, (snapshot) => {
      if (snapshot.exists()) {
        setPlaceData(snapshot.val());
      }
    });

    return () => unsubscribe();
  }, [index]);

  async function handleSaveReview() {
    try {
      const db = getDatabase();

      const newReview = {
        ...review,
        fecha: new Date().toISOString().split('T')[0],
        usuario: 'Agustina',
        imagen: file?.uri ?? null,
      };

      const comentariosRef = ref(db, `places/${index}/comentarios`);

      await push(comentariosRef, newReview);

      setReview({
        fecha: '',
        texto: '',
        usuario: '',
        valoracion: 0,
      });

      setFile(null);

      closeModal();
    } catch {
      alert('Error guardando reseña');
    }
  }

  async function handlePickFile() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      const asset = result.assets[0];

      setFile({
        uri: asset.uri,
        name: asset.fileName ?? 'image.jpg',
        mimeType: asset.mimeType ?? 'image/jpeg',
      });
    }
  }

  const comentariosArray = Object.values(placeData?.comentarios || {});

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView className="flex-1 bg-white">
        <Image
          source={{ uri: place.portada }}
          style={{ width: '100%', height: 230 }}
          resizeMode="cover"
        />

        <View className="gap-5 p-4">
          <View className="w-full">
            <View className="flex w-full flex-row items-center justify-between">
              <Text className="text-2xl font-bold">{place.nombre}</Text>
              <View className="flex-row items-center gap-2">
                <Icon source="star" size={20} color="#FFD700" />
                <Text className="font-semibold">{place.valoracion}</Text>
              </View>
            </View>

            <Text className="text-gray-500">{place.subcategoria}</Text>
          </View>

          <View className="flex w-full flex-row items-center justify-between ">
            <View className="flex-row  gap-2">
              <Icon source="map-marker" size={20} />
              <Text className="">{place.direccion}</Text>
            </View>

            <View className="flex-row gap-2">
              <Text>
                {place.hora_apertura} - {place.hora_cierre}
              </Text>
              <Icon source="clock-outline" size={20} />
            </View>
          </View>

          <View className="flex w-full flex-row items-center justify-between ">
            {place.telefono && (
              <Pressable onPress={callPhone} className="flex-row items-center gap-2">
                <Icon source="phone" size={20} />
                <Text className="text-blue-600">{place.telefono}</Text>
              </Pressable>
            )}

            {place.sitio_web && (
              <Pressable onPress={openWebsite} className="flex-row items-center gap-2">
                <Text className="text-blue-600">{place.sitio_web}</Text>
                <Icon source="web" size={20} />
              </Pressable>
            )}
          </View>

          <Divider />

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

          <Divider />

          {place.descripcion && (
            <View>
              <Text className="mb-1 text-lg font-semibold">Descripción</Text>
              <Text className="text-gray-600">{place.descripcion}</Text>
            </View>
          )}

          <Divider />

          <View>
            <View className="flex w-full flex-row items-start justify-between ">
              <Text className=" text-lg font-semibold">Reseñas</Text>
              <Button
                variant="primary"
                text="Agregar"
                icon={<Icon source="plus-circle-outline" size={20} color="#fff" />}
                iconPosition="right"
                onPress={() => openModal('review')}
              />
            </View>

            {comentariosArray.map((c: any, index: number) => (
              <View key={index} className="m-3 rounded-lg bg-gray-100 p-3">
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

          {isOpen && modalKey === 'review' && (
            <Modal visible={isOpen} onDismiss={closeModal}>
              <View className="flex w-full bg-onPrimary px-4 py-10" style={{ gap: 20 }}>
                <View className="flex w-full flex-row items-end justify-between">
                  <Text className=" text-xl font-semibold">Agregar Reseña</Text>
                  <Button
                    variant="secondary"
                    icon={<Icon source="window-close" size={20} color="#6233B9" />}
                    onPress={closeModal}
                  />
                </View>
                <Divider />
                <StarRating
                  rating={review.valoracion}
                  onChange={(value) => setReview({ ...review, valoracion: Math.round(value) })}
                  maxStars={5}
                  starSize={30}
                />
                <Input
                  label="Descripción"
                  placeholder="Ingresa un comentario..."
                  variant="textarea"
                  value={review.texto}
                  onChangeText={(texto) => setReview({ ...review, texto: texto })}
                />
                <FilePicker
                  label="Imagen (opcional)"
                  file={file}
                  onPick={handlePickFile}
                  onRemove={() => setFile(null)}
                />
                <Button
                  variant="primary"
                  text="Enviar"
                  iconPosition="right"
                  onPress={handleSaveReview}
                  containerClassName="h-12"
                />
              </View>
            </Modal>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
