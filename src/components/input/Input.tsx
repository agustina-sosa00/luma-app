import { forwardRef, useState } from 'react';
import { Text, TextInput, View, Pressable } from 'react-native';
import { Icon } from 'react-native-paper';

type InputVariant = 'text' | 'password' | 'email' | 'number' | 'textarea';

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  variant?: InputVariant;
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

  const isTextarea = variant === 'textarea';

  return (
    <View className={`flex gap-1 ${containerClassName ?? ''}`}>
      {label && <Text className="text-md font-semibold text-textPrimary">{label}</Text>}

      <View className="relative">
        <TextInput
          ref={ref}
          value={value}
          editable={!disabled}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={variant === 'password' && !showPassword}
          multiline={isTextarea}
          numberOfLines={isTextarea ? 4 : 1}
          textAlignVertical={isTextarea ? 'top' : 'center'}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            rounded-md border bg-white px-3 py-2 text-base text-black
            ${isTextarea ? 'min-h-[120px]' : 'h-12'}
            ${focused ? 'border-primary' : 'border-borders'}
            ${disabled ? 'border-disabled bg-gray-100' : ''}
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
