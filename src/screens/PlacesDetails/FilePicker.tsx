import { FileType } from '@/types';
import { View, Text, Pressable, Image } from 'react-native';
import { Icon } from 'react-native-paper';

interface FilePickerProps {
  label?: string;
  file: FileType | null;
  onPick: () => void;
  onRemove: () => void;
}

export default function FilePicker({ label, file, onPick, onRemove }: FilePickerProps) {
  const isImage = file?.mimeType?.includes('image');

  return (
    <View className="w-full" style={{ gap: 8 }}>
      {label && <Text className="text-base font-semibold text-textPrimary">{label}</Text>}

      <View className="h-32 items-center justify-center rounded-md border border-gray-300 bg-white p-3">
        {file ? (
          <View className="flex w-full flex-row items-center justify-between">
            {isImage && (
              <Image
                source={{ uri: file.uri }}
                style={{ width: 40, height: 40, borderRadius: 6 }}
              />
            )}
            <Text className="text-onSurface mx-2 flex-1 text-sm font-medium" numberOfLines={1}>
              {file.name}
            </Text>
            <Pressable onPress={onRemove}>
              <Icon source="trash-can-outline" size={22} color="red" />
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={onPick} className="items-center justify-center">
            <Icon source="cloud-upload-outline" size={40} color="#6233B9" />

            <Text className="mt-2 text-center text-sm text-gray-500">Subir imagen o archivo</Text>
          </Pressable>
        )}
      </View>

      <Text className="text-sm text-gray-500">Archivos permitidos: .pdf, .jpg, .png</Text>
    </View>
  );
}
