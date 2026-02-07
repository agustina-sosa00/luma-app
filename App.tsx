import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import './global.css';
import { useFonts } from 'expo-font';
import Login from '@/screens/Login/Login';
import AppNavigator from '@/navigation/AppNavigator';

export default function App() {
  const [fontsLoaded] = useFonts({
    Outfit: require('./assets/fonts/Outfit-VariableFont_wght.ttf'),
  });

  const [session, setSession] = useState(false);

  if (!fontsLoaded) return null;
  return (
    <SafeAreaView className="flex-1">
      {session ? <AppNavigator /> : <Login setSession={setSession} />}
    </SafeAreaView>
  );
}
