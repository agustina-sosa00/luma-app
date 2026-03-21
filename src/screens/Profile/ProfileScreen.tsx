import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Button from '@/components/buttons/Button';
import { Icon } from 'react-native-paper';
import Input from '@/components/input/Input';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, update } from 'firebase/database';

export default function ProfileScreen() {
  const { user } = useSelector((state: any) => state.app);
  const [isEdit, setIsEdit] = useState(false);
  const [formUser, setFormUser] = useState({
    nombre: user?.nombre,
    apellido: user?.apellido,
    email: user?.email,
    provincia: user?.provincia,
    telefono: user?.telefono,
    image: user?.image,
  });

  function handleEdit() {
    setIsEdit(!isEdit);
  }

  async function handleSave() {
    try {
      const auth = getAuth();
      const db = getDatabase();

      const uid = auth.currentUser?.uid;

      if (!uid) {
        alert('No hay usuario logueado');
        return;
      }

      const userRef = ref(db, `users/${uid}`);

      await update(userRef, {
        nombre: formUser.nombre,
        apellido: formUser.apellido,
        email: formUser.email,
        provincia: formUser.provincia,
        telefono: formUser.telefono,
        image: formUser.image,
      });

      setIsEdit(false);
      alert('Usuario actualizado correctamente');
    } catch (error) {
      alert('Error al guardar');
    }
  }

  async function editImage() {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) return;

    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
    });

    if (!result.canceled) {
      const base64 = result.assets[0].base64;

      setFormUser({
        ...formUser,
        image: `data:image/jpeg;base64,${base64}`,
      });
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex w-full flex-1 items-center bg-onPrimary p-6" style={{ gap: 24 }}>
        <View>
          {formUser?.image ? (
            <Image
              source={formUser?.image && { uri: formUser.image }}
              className="h-48 w-48 rounded-full"
            />
          ) : (
            <View className="flex h-48 w-48 items-center justify-center rounded-full bg-primary">
              <Text className="font-poppinsSemiBold text-[5rem] text-onPrimary">
                {user?.nombre.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}

          {isEdit && (
            <Pressable
              className="absolute bottom-2 right-2 h-14 w-14 flex-row items-center justify-center !rounded-full border border-primary bg-white "
              onPress={editImage}>
              <Icon source="pencil" size={20} color="#6233B9" />
            </Pressable>
          )}
        </View>
        <View className="w-full" style={{ gap: 24 }}>
          <Input
            variant="text"
            label="Nombre: "
            value={formUser?.nombre}
            onChangeText={(nombre) => setFormUser({ ...formUser, nombre: nombre })}
            disabled={!isEdit}
          />
          <Input
            variant="text"
            label="Apellido: "
            value={formUser?.apellido}
            onChangeText={(apellido) => setFormUser({ ...formUser, apellido: apellido })}
            disabled={!isEdit}
          />
          <Input
            variant="text"
            label="Email: "
            value={user?.email}
            onChangeText={(email) => setFormUser({ ...formUser, email: email })}
            disabled={!isEdit}
          />
          <Input
            variant="text"
            label="Provincia / Ciudad: "
            value={user?.provincia}
            onChangeText={(provincia) => setFormUser({ ...formUser, provincia: provincia })}
            disabled={!isEdit}
          />
          <Input
            variant="text"
            label="Teléfono: "
            value={user?.telefono}
            onChangeText={(telefono) => setFormUser({ ...formUser, telefono: telefono })}
            disabled={!isEdit}
          />
          <Button
            variant="primary"
            text={isEdit ? 'Guardar' : 'Editar'}
            icon={<Icon source={isEdit ? 'content-save' : 'pencil'} size={20} color="#FFFFFF" />}
            iconPosition="right"
            containerClassName="h-12 w-full"
            onPress={!isEdit ? handleEdit : handleSave}
          />
        </View>
      </View>
    </ScrollView>
  );
}
