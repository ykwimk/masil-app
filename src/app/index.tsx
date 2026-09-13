import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { dummyArticles } from '@/data/articles';
import { useTheme } from '@/hooks/use-theme';

export default function HomeScreen() {
  const theme = useTheme();
  const { fontScale } = useWindowDimensions();

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: theme.background }]}
      edges={['top', 'left', 'right']}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="never"
      >
        <View style={styles.heading}>
          <Text
            key={`home-title-${fontScale}`}
            accessibilityRole="header"
            style={[styles.title, { color: theme.text }]}
          >
            마실
          </Text>
          <Text
            key={`home-description-${fontScale}`}
            style={[styles.meta, { color: theme.textSecondary }]}
          >
            예시 콘텐츠
          </Text>
        </View>

        {dummyArticles.map((article) => (
          <View
            key={article.id}
            style={[styles.article, { borderColor: theme.backgroundElement }]}
          >
            <Text
              key={`article-title-${fontScale}`}
              accessibilityRole="header"
              style={[styles.articleTitle, { color: theme.text }]}
            >
              {article.title}
            </Text>
            <Text
              key={`article-description-${fontScale}`}
              style={[styles.description, { color: theme.text }]}
            >
              {article.description}
            </Text>
            <Text
              key={`article-editorName-${fontScale}`}
              style={[styles.meta, { color: theme.textSecondary }]}
            >
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
