import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '@/screens/Home/Home';
import Favorites from '@/screens/Favorites/Favorites';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favorites" component={Favorites} />
    </Tab.Navigator>
  );
}
