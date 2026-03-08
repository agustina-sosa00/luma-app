import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

type ButtonVariant = 'primary' | 'secondary' | 'iconButton' | 'error';
type IconPosition = 'left' | 'right';

interface ButtonProps {
  text?: string;
  icon?: ReactNode;
  variant: ButtonVariant;
  iconPosition?: IconPosition;
  onPress?: () => void;
  disabled?: boolean;
  containerClassName?: string;
  loader?: boolean;
}

const containerVariants = {
  primary: 'bg-primary',
  secondary: 'bg-white border border-primary',
  iconButton: 'bg-gray-200',
  error: 'bg-error',
};

const textVariants = {
  primary: 'text-white',
  secondary: 'text-primary',
  iconButton: 'text-primary',
  error: 'text-[#FFFFFF]',
};

const loaderColors = {
  primary: '#FFFFFF',
  secondary: '#6233B9',
  iconButton: '#6233B9',
  error: '#FFFFFF',
};

const baseStyles = 'flex-row items-center justify-center gap-2 rounded-md px-4 py-2';

export default function Button({
  text,
  icon,
  variant,
  iconPosition = 'left',
  onPress,
  disabled,
  containerClassName,
  loader,
}: ButtonProps) {
  return (
    <Pressable onPress={onPress} disabled={disabled || loader}>
      {({ pressed }) => (
        <View
          className={`
            ${baseStyles}
            ${containerVariants[variant]}
            ${disabled ? 'bg-[#BDBDBD]' : pressed ? 'opacity-80' : ''}
            ${iconPosition === 'right' ? 'flex-row-reverse' : ''}
            ${containerClassName}
          `}>
          {loader ? (
            <ActivityIndicator animating size="small" color={loaderColors[variant]} />
          ) : (
            <>
              {icon}
              {text && <Text className={`font-semibold ${textVariants[variant]}`}>{text}</Text>}
            </>
          )}
        </View>
      )}
    </Pressable>
  );
}
