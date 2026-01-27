import { forwardRef, useState } from 'react';
import { Text, TextInput, View, Pressable } from 'react-native';
import { Icon } from 'react-native-paper';

type InputVariant = 'text' | 'password' | 'email' | 'number';

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  variant: InputVariant;
  disabled?: boolean;
  containerClassName?: string;
}

export default forwardRef<TextInput, InputProps>(function Input(
  { label, placeholder, value, onChangeText, variant = 'text', disabled, containerClassName },
  ref
) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const keyboardType =
    variant === 'email' ? 'email-address' : variant === 'number' ? 'numeric' : 'default';

  return (
    <View className={`flex gap-1 ${containerClassName ?? ''}`}>
      {label && <Text className="text-sm font-semibold text-textPrimary">{label}</Text>}

      <View className="relative">
        <TextInput
          ref={ref}
          value={value}
          editable={!disabled}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={variant === 'password' && !showPassword}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={` h-12 
            rounded border bg-white px-3 py-2 text-base text-black
            ${focused ? 'border-primary' : 'border-gray-400'}
            ${disabled ? 'border-gray-300 bg-gray-100' : ''}
          `}
        />

        {variant === 'password' && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3">
            <Icon source={showPassword ? 'eye' : 'eye-off'} size={20} />
          </Pressable>
        )}
      </View>
    </View>
  );
});
