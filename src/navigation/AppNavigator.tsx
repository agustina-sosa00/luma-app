import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlacesDetails from '@/screens/PlacesDetails/PlacesDetails';
import { RootStackParamList } from '@/types';

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function AppNavigator(setSession: any) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Tabs */}
        <Stack.Screen name="Tabs" options={{ headerShown: false }}>
          {(props) => <TabNavigator {...props} setSession={setSession} />}
        </Stack.Screen>

        {/* Screen fuera del tab */}
        <Stack.Screen name="PlaceDetail" component={PlacesDetails} options={{ title: 'Lugar' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
