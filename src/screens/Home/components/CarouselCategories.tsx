import { ScrollView } from 'react-native';

export default function CategoryCarousel({
  children,
  height,
}: {
  children: React.ReactNode;
  height?: number;
}) {
  return (
    <ScrollView
      style={{ height }}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8 }}>
      {children}
    </ScrollView>
  );
}
