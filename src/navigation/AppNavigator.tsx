import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlacesDetails from '@/screens/PlacesDetails/PlacesDetails';
import { RootStackParamList } from '@/types';
import CustomHeader from '@/components/CustomHeader';
import PlaceCategories from '@/screens/PlaceCategories/PlaceCategories';

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function AppNavigator(setSession: any) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" options={{ headerShown: false }}>
          {(props) => <TabNavigator {...props} setSession={setSession} />}
        </Stack.Screen>

        <Stack.Screen
          name="PlaceDetail"
          component={PlacesDetails}
          options={{
            header: () => <CustomHeader title="Lugar" />,
          }}
        />
        <Stack.Screen
          name="PlaceCategories"
          component={PlaceCategories}
          options={({ route }) => ({
            header: () => <CustomHeader title={route.params?.category || ''} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
