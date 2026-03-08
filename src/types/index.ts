import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Tabs: undefined;
  PlaceDetail: { place: any };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tabs'>;

export interface Comentario {
  fecha: string;
  texto: string;
  usuario: string;
  valoracion: number;
}
export interface IPlace {
  apto: string;
  categoria: string[];
  comentarios: Comentario[];
  descripcion: string;
  direccion: string;
  email: string;
  hora_apertura: string;
  hora_cierre: string;
  id: string;
  latitud: number;
  longitud: number;
  nombre: string;
  portada: string;
  sitio_web: string;
  subcategoria: string;
  telefono: string;
  valoracion: number;
}
