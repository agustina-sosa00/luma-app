import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import './global.css';
import { useFonts } from 'expo-font';
import Home from '@/screens/Home';
import Login from '@/screens/Login/Login';

export default function App() {
  const [fontsLoaded] = useFonts({
    Outfit: require('./assets/fonts/Outfit-VariableFont_wght.ttf'),
  });

  const [session, setSession] = useState(false);

  if (!fontsLoaded) return null;
  return <SafeAreaView>{session ? <Home /> : <Login setSession={setSession} />}</SafeAreaView>;
}
