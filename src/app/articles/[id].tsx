import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { dummyArticles } from '@/data/articles';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Spacing } from '@/constants/theme';

export default function ArticleScreen() {
  const params = useLocalSearchParams();
  const theme = useTheme();
  const { fontScale } = useWindowDimensions();
  const id = typeof params.id === 'string' ? params.id : null;
  const articleById = dummyArticles.find((article) => article.id === id);

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: theme.background }]}
      edges={['left', 'right', 'bottom']}
    >
      <Stack.Screen
        options={{
          headerTitle: '이야기',
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="never"
      >
        {articleById ? (
          <>
            <ThemedText
              key={`article-title-${fontScale}`}
              accessibilityRole="header"
              type="title"
              themeColor="text"
              style={styles.featuredArticleTitle}
            >
              {articleById.title}
            </ThemedText>
            <ThemedText
              key={`article-description-${fontScale}`}
              themeColor="text"
              style={styles.description}
            >
              {articleById.description}
            </ThemedText>
            <ThemedText
              key={`article-editorName-${fontScale}`}
              themeColor="textSecondary"
              style={styles.meta}
            >
              {articleById.editorName}
            </ThemedText>
          </>
        ) : (
          <Link href="/">
            <Pressable>홈으로</Pressable>
          </Link>
        )}
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
  featuredArticleTitle: {
    fontSize: 26,
    lineHeight: 36,
  },
  featuredImageContainer: {
    height: 178,
    backgroundColor: '#DFE3D5',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
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
