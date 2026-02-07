// src/hooks/useUserLocation.ts
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export function useUserLocation() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          setError('Permiso de ubicación denegado');
          setLoading(false);
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
        console.log('latitud: ', currentLocation.coords.latitude);
        console.log('longitud: ', currentLocation.coords.longitude);
      } catch (err) {
        setError('No se pudo obtener la ubicación');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { location, loading, error };
}
