import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Tabs: undefined;
  PlaceDetail: { place: any };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tabs'>;
