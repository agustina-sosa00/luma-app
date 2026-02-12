import { Pressable, Text, View } from 'react-native';
import { Icon } from 'react-native-paper';

interface Props {
  sourceIcon: string;
  sizeIcon: number;
  textButton: string;
}

export default function ButtonCategory({ sourceIcon, sizeIcon, textButton }: Props) {
  return (
    <Pressable>
      <View className="flex items-center justify-center bg-primary px-6 py-7">
        <Icon size={sizeIcon} source={sourceIcon} color="#ffffff" />
        <Text className="text-onPrimary">{textButton}</Text>
      </View>
    </Pressable>
  );
}
