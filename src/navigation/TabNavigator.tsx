import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '@/screens/Home/Home';
import Favorites from '@/screens/Favorites/Favorites';
import MapScreen from '@/screens/Map/MapScreen';
import { Icon } from 'react-native-paper';
import { useUserLocation } from '@/hooks/useUserLocation';
const Tab = createBottomTabNavigator();

interface TabNavigatorProps {
  setSession: (session: boolean) => void;
}

export default function TabNavigator({ setSession }: TabNavigatorProps) {
  const { location, loading, error } = useUserLocation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6233B9',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#6233B9',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => <Icon source="home" size={26} color={color} />,
          title: 'titleeeeee',
          tabBarLabel: 'name boton',
        }}
        component={Home}
      />

      <Tab.Screen
        name="Mapa"
        options={{
          tabBarIcon: ({ color }) => <Icon source="map" size={24} color={color} />,
        }}>
        {() => (
          <MapScreen location={location} loading={loading} error={error} setSession={setSession} />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ color }) => <Icon source="cards-heart" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
