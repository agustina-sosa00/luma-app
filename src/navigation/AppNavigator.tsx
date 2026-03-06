import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';

export default function AppNavigator(setSession: any) {
  return (
    <NavigationContainer>
      <TabNavigator setSession={setSession} />
    </NavigationContainer>
  );
}
