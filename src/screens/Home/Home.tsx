import Search from '@/components/Search/Search';
import { Text, View } from 'react-native';

export default function Home() {
  return (
    <View className="h-80">
      <Text>Home</Text>
      <Search />
    </View>
  );
}
