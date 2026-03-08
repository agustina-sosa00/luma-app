import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Icon } from 'react-native-paper';
export default function CardPlace({ place, handleNavigateDetails }: any) {
  return (
    <View className="absolute bottom-10 z-50 flex h-52 w-full items-center">
      <View className="flex h-full w-96 items-center justify-between rounded-lg bg-onPrimary pb-2">
        <Image
          source={{
            uri: 'https://plus.unsplash.com/premium_photo-1670984940113-f3aa1cd1309a?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudGVzfGVufDB8fDB8fHww',
          }}
          className="flex h-32 w-full items-center justify-end rounded-t-lg opacity-80"
        />
        <View className="w-full flex-row items-center justify-between px-2">
          <Text className="font-poppinsSemiBold text-base  text-textPrimary">{place.nombre}</Text>
        </View>
        <View className="w-full flex-row items-center justify-between px-2">
          <Text className="text-sm font-medium text-disabled ">{place.direccion}</Text>

          <Pressable onPress={handleNavigateDetails}>
            <Text>
              Ver Detalles <Icon source={'arrow-right-thin'} size={20} color="#6233B9" />
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
