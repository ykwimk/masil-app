import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';

export default function LibraryScreen() {
  const theme = useTheme();
  const { fontScale } = useWindowDimensions();

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: theme.background }]}
      edges={['top', 'left', 'right']}
    >
      <View style={styles.view}>
        <ThemedText
          key={`library-title-${fontScale}`}
          accessibilityRole="header"
          type="title"
          themeColor="text"
          style={styles.title}
        >
          서재
        </ThemedText>
        <ThemedText
          key={`library-description-${fontScale}`}
          themeColor="textSecondary"
        >
          저장한 이야기를 모아볼 공간이에요. 저장 기능은 준비 중이에요.
        </ThemedText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  view: {
    padding: Spacing.four,
    gap: Spacing.two,
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
  },
});
