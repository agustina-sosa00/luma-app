import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-paper';

export default function CustomHeader({ title }: { title: string }) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: 'white',
      }}>
      <Pressable onPress={() => navigation.goBack()}>
        <Icon source="arrow-left" size={24} />
      </Pressable>

      <Text style={{ fontSize: 18, marginLeft: 16, fontWeight: '600' }}>{title}</Text>
    </View>
  );
}
