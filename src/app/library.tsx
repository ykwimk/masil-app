import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';

export default function LibraryScreen() {
  const theme = useTheme();
  const { fontScale } = useWindowDimensions();

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: theme.background }]}
      edges={['top', 'left', 'right']}
    >
      <View style={styles.view}>
        <Text
          key={`library-title-${fontScale}`}
          accessibilityRole="header"
          style={[styles.title, { color: theme.text }]}
        >
          서재
        </Text>
        <Text
          key={`library-description-${fontScale}`}
          style={{ color: theme.textSecondary }}
        >
          저장한 이야기를 모아볼 공간이에요. 저장 기능은 준비 중이에요.
        </Text>
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
    fontWeight: '600',
  },
});
