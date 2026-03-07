import { useEffect, useState } from 'react';
import './global.css';
import { useFonts } from 'expo-font';
import Login from '@/screens/Auth/Login/Login';
import AppNavigator from '@/navigation/AppNavigator';
import Register from '@/screens/Auth/Register/Register';
import { SafeAreaView } from 'react-native-safe-area-context';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function App() {
  const [fontsLoaded] = useFonts({
    Outfit: require('./assets/fonts/Outfit-VariableFont_wght.ttf'),
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  const [session, setSession] = useState<boolean | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [authUser, setAuthUser] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setSession(!!user);
    });

    return unsubscribe;
  }, []);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView className="flex-1">
      <Provider store={store}>
        {session && authUser ? (
          <AppNavigator setSession={setSession} />
        ) : isLogin ? (
          <Login setIsLogin={setIsLogin} setAuthUser={setAuthUser} />
        ) : (
          <Register setIsLogin={setIsLogin} />
        )}
      </Provider>
    </SafeAreaView>
  );
}
