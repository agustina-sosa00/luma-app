import './global.css';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import AppLayout from 'AppLayout';

export default function App() {
  return (
    <SafeAreaView className="flex-1">
      <Provider store={store}>
        <AppLayout />
      </Provider>
    </SafeAreaView>
  );
}
