import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { dummyArticles } from '@/data/articles';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import ArticleBody from '@/components/article-body';

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
          <View>
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
              themeColor="textSecondary"
              style={styles.description}
            >
              {articleById.description}
            </ThemedText>
            <ThemedText
              key={`article-editorName-${fontScale}`}
              themeColor="text"
              style={styles.meta}
            >
              {articleById.editorName}
            </ThemedText>
            {articleById.image && (
              <View style={styles.featuredImageContainer}>
                <Image
                  source={articleById.image.source}
                  alt={articleById.image.alt}
                  style={{ width: 252, height: 252 }}
                  resizeMode="contain"
                />
              </View>
            )}
            <ArticleBody key={articleById.id} html={articleById.bodyHtml} />
          </View>
        ) : (
          <>
            <ThemedText>이야기를 찾을 수 없어요.</ThemedText>
            <Link href="/" asChild>
              <Pressable>
                <ThemedText>홈으로</ThemedText>
              </Pressable>
            </Link>
          </>
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
    paddingTop: Spacing.five,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
    gap: Spacing.five,
  },
  featuredArticleTitle: {
    fontSize: 30,
    lineHeight: 42,
  },
  featuredImageContainer: {
    height: 208,
    backgroundColor: '#DFE3D5',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: 28,
  },
  description: {
    fontSize: 16,
    lineHeight: 28,
    marginTop: Spacing.three,
  },
  meta: {
    fontSize: 13,
    lineHeight: 21,
    marginTop: Spacing.four,
  },
});
