import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import './global.css';

export default function App() {
  return (
    <SafeAreaView>
      <Text className="text-3xl">Hello</Text>
    </SafeAreaView>
  );
}
