import { useEffect, RefObject } from 'react';
import { View, TextInput, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../buttons/Button';
import { Icon } from 'react-native-paper';

interface SearchProps {
  inputRef?: RefObject<TextInput>;
  handleOnSearch?: () => void;
  handleClean: () => void;
  isSearching: boolean;
  onChange: (text: string) => void;
  value: string;
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
  value,
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
    <View className="flex-1 flex-row items-center gap-1 rounded-lg">
      <TextInput
        ref={inputRef}
        className={`
          h-12 flex-1 rounded-md border border-borders bg-onPrimary p-2 text-base
        `}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        editable={!isSearching}
        keyboardType={keyboardType}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
      />

      {buttonClean && isSearching ? (
        <Button
          variant="error"
          onPress={handleClean}
          icon={<MaterialIcons name="cleaning-services" size={20} color="white" />}
          containerClassName="h-12"
        />
      ) : (
        <Button
          variant="primary"
          onPress={handleOnSearch}
          loader={isLoading}
          containerClassName="h-12"
          icon={<Icon source="magnify" size={20} color="white" />}
        />
      )}
    </View>
  );
}
