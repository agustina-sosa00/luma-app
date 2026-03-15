import { IPlace } from '@/types';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Icon } from 'react-native-paper';

export default function CardPlaceHome({
  place,
  handleNavigateDetails,
  handleFavorite,
  favorite,
  width,
}: {
  place: IPlace;
  handleNavigateDetails?: () => void;
  handleFavorite: (id: string) => void;
  favorite?: boolean;
  width?: string;
}) {
  return (
    <View
      className={`relative mr-4 ${width ? `w-${width}` : 'w-72'} h-56  items-center rounded-lg border border-borders`}>
      <View className="flex h-full w-full justify-between rounded-lg bg-onPrimary pb-2">
        <Image
          source={{
            uri: place.portada,
          }}
          className="h-32 w-full rounded-t-lg"
        />

        <View className="flex w-full flex-row justify-between px-2 py-1">
          <Text className="font-poppinsSemiBold text-base text-textPrimary">{place.nombre}</Text>
          {favorite && (
            <Pressable onPress={() => handleFavorite(place.id)}>
              <Icon
                source={favorite ? 'heart' : 'heart-outline'}
                size={24}
                color={favorite ? '#6233B9' : '#151515'}
              />
            </Pressable>
          )}
        </View>

        <View className="px-2">
          <Text className="text-md capitalize text-[#494949]">{place.subcategoria}</Text>
        </View>

        <View className="flex-row items-center justify-between px-2">
          <View className="flex-row items-center gap-2">
            <Icon source="star" size={20} color="#FFD700" />
            <Text className="font-semibold">{place.valoracion}</Text>
          </View>

          <Pressable className="flex-row items-center" onPress={handleNavigateDetails}>
            <Text className="font-semibold text-primary">Ver detalles</Text>
            <Icon source={'arrow-right-thin'} size={22} color="#6233B9" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
