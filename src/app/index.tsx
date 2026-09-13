import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { dummyArticles } from '@/data/articles';
import { useTheme } from '@/hooks/use-theme';

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: theme.background }]}
      // NativeTabs가 Android의 하단, iOS의 스크롤 안전 영역을 처리한다.
      edges={Platform.OS === 'android' ? ['top', 'left', 'right'] : []}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.heading}>
          <Text
            accessibilityRole="header"
            style={[styles.title, { color: theme.text }]}
          >
            마실
          </Text>
          <Text style={[styles.meta, { color: theme.textSecondary }]}>
            예시 콘텐츠
          </Text>
        </View>

        {dummyArticles.map((article) => (
          <View
            key={article.id}
            style={[styles.article, { borderColor: theme.backgroundElement }]}
          >
            <Text
              accessibilityRole="header"
              style={[styles.articleTitle, { color: theme.text }]}
            >
              {article.title}
            </Text>
            <Text style={[styles.description, { color: theme.text }]}>
              {article.description}
            </Text>
            <Text style={[styles.meta, { color: theme.textSecondary }]}>
              {article.editorName}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    padding: Spacing.four,
    gap: Spacing.five,
  },
  heading: {
    gap: Spacing.two,
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '600',
  },
  article: {
    gap: Spacing.two,
    paddingBottom: Spacing.four,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  articleTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  meta: {
    fontSize: 14,
    lineHeight: 20,
  },
});
