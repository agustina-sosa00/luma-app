import { useState } from 'react';
import './global.css';
import { useFonts } from 'expo-font';
import Login from '@/screens/Auth/Login/Login';
import AppNavigator from '@/navigation/AppNavigator';
import Register from '@/screens/Auth/Register/Register';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [fontsLoaded] = useFonts({
    Outfit: require('./assets/fonts/Outfit-VariableFont_wght.ttf'),
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  const [session, setSession] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  if (!fontsLoaded) return null;
  return (
    <SafeAreaView className="flex-1">
      {session ? (
        <AppNavigator />
      ) : isLogin ? (
        <Login setSession={setSession} setIsLogin={setIsLogin} />
      ) : (
        <Register setIsLogin={setIsLogin} />
      )}
    </SafeAreaView>
  );
}
