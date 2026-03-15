import { useEffect, useState } from 'react';
import './global.css';
import { useFonts } from 'expo-font';
import Login from '@/screens/Auth/Login/Login';
import AppNavigator from '@/navigation/AppNavigator';
import Register from '@/screens/Auth/Register/Register';
import { SafeAreaView } from 'react-native-safe-area-context';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setSession } from '@/store/auth/authSlice';
import { useUserLocation } from '@/hooks/useUserLocation';

export default function AppLayout() {
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    Outfit: require('./assets/fonts/Outfit-VariableFont_wght.ttf'),
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  const session = useSelector((state: any) => state.auth.session);
  const authUser = useSelector((state: any) => state.auth.authUser);
  const [isLogin, setIsLogin] = useState(true);

  const { location, loading, error } = useUserLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setSession(!!user));
      dispatch(
        setAuthUser({
          uid: user?.uid,
          email: user?.email,
          displayName: user?.displayName,
        })
      );
    });

    return unsubscribe;
  }, []);

  if (!fontsLoaded) return null;
  return (
    <SafeAreaView className="flex-1">
      {session && authUser ? (
        <AppNavigator setSession={setSession} />
      ) : isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <Register setIsLogin={setIsLogin} />
      )}
    </SafeAreaView>
  );
}
