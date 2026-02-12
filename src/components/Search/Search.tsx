import { useEffect, RefObject } from 'react';
import { View, TextInput, Keyboard } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Button from '../buttons/Button';

interface SearchProps {
  inputRef?: RefObject<TextInput>;
  handleOnSearch?: () => void;
  handleClean: () => void;
  isSearching: boolean;
  onChange: (text: string) => void;
  inputName: string;
  buttonClean?: boolean;
  placeholder?: string;
  isLoading?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
}

export default function Search({
  inputRef,
  isSearching,
  handleOnSearch,
  handleClean,
  onChange,
  inputName,
  buttonClean,
  placeholder = 'Buscar...',
  isLoading,
  keyboardType = 'default',
}: SearchProps) {
  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef]);

  const onSubmit = () => {
    Keyboard.dismiss();
    handleOnSearch?.();
  };

  return (
    <View className=" flex-row items-center gap-1 rounded-lg">
      <TextInput
        ref={inputRef}
        className={`
          h-10 w-96 rounded-md border border-borders bg-onPrimary p-2 text-base
        `}
        placeholder={placeholder}
        value={inputName}
        onChangeText={onChange}
        editable={!isSearching}
        keyboardType={keyboardType}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
      />

      {/* SEARCH */}
      <Button
        variant="primary"
        onPress={handleOnSearch}
        disabled={isSearching}
        loader={isLoading}
        icon={<Ionicons name="search" size={18} color="white" />}
      />

      {/* CLEAN */}
      {buttonClean && (
        <Button
          variant="iconButton"
          onPress={handleClean}
          disabled={!isSearching}
          icon={<MaterialIcons name="cleaning-services" size={18} />}
        />
      )}
    </View>
  );
}
