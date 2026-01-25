import { SafeAreaView } from 'react-native-safe-area-context';
import './global.css';
import { Text } from 'react-native';

export default function App() {
  return (
    <SafeAreaView>
      <Text className="text-3xl font-bold ">Hello world!</Text>
    </SafeAreaView>
  );
}
