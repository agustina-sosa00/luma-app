import { Pressable, Text, View } from 'react-native';
import { Icon } from 'react-native-paper';

interface Props {
  sourceIcon: string;
  sizeIcon: number;
  textButton: string;
  onPress?: () => void;
}

export default function ButtonCategory({ sourceIcon, sizeIcon, textButton, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <View className="flex h-20 w-28 items-center justify-center rounded-md bg-primary">
        <Icon size={sizeIcon} source={sourceIcon} color="#ffffff" />
        <Text className="text-onPrimary">{textButton}</Text>
      </View>
    </Pressable>
  );
}
