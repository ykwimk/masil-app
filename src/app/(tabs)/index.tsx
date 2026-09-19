import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isLoaded } from 'expo-font';
import { Link } from 'expo-router';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { dummyArticles } from '@/data/articles';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/themed-text';

export default function HomeScreen() {
  const theme = useTheme();
  const { fontScale } = useWindowDimensions();

  const [featuredArticle, ...remainingArticles] = dummyArticles;

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
          <ThemedText
            key={`home-title-${fontScale}`}
            accessibilityRole="header"
            themeColor="text"
            type="title"
            style={styles.title}
          >
            일과 삶 사이,{'\n'}
            잠깐{' '}
            <Text
              style={{
                color: theme.primary,
                fontFamily: isLoaded('MulgyeolBold')
                  ? 'MulgyeolBold'
                  : undefined,
                fontWeight: '700',
              }}
            >
              마실.
            </Text>
          </ThemedText>
          <ThemedText
            key={`home-description-${fontScale}`}
            themeColor="textSecondary"
            style={styles.homeDescription}
          >
            각자의 속도로 살아가는 우리의 이야기.
          </ThemedText>
        </View>
        {featuredArticle ? (
          <View style={styles.articleSection}>
            <ThemedText
              key={`article-section-title-${fontScale}`}
              accessibilityRole="header"
              themeColor="text"
              type="title"
              style={styles.articleSectionTitle}
            >
              먼저 읽어볼 이야기
            </ThemedText>
            {featuredArticle.image && (
              <View style={styles.featuredImageContainer}>
                <Image
                  source={featuredArticle.image.source}
                  alt={featuredArticle.image.alt}
                  resizeMode="contain"
                  style={{ width: 212, height: 212 }}
                />
              </View>
            )}
            <View
              key={featuredArticle.id}
              style={[styles.article, { borderColor: theme.backgroundElement }]}
            >
              <ThemedText
                key={`article-title-${fontScale}`}
                accessibilityRole="header"
                type="title"
                themeColor="text"
                style={styles.featuredArticleTitle}
              >
                {featuredArticle.title}
              </ThemedText>
              <ThemedText
                key={`article-description-${fontScale}`}
                themeColor="text"
                style={styles.description}
              >
                {featuredArticle.description}
              </ThemedText>
              <ThemedText
                key={`article-editorName-${fontScale}`}
                themeColor="textSecondary"
                style={styles.meta}
              >
                {featuredArticle.editorName}
              </ThemedText>
            </View>
          </View>
        ) : (
          <ThemedText
            key={`empty-state-${fontScale}`}
            themeColor="textSecondary"
            style={styles.meta}
          >
            새로운 이야기를 준비하고 있어요.
          </ThemedText>
        )}
        {remainingArticles.length > 0 && (
          <View style={styles.articleSection}>
            <ThemedText
              key={`article-section-title-${fontScale}`}
              accessibilityRole="header"
              themeColor="text"
              type="title"
              style={styles.articleSectionTitle}
            >
              더 읽어볼 이야기
            </ThemedText>
            {remainingArticles.map((article) => (
              <Link
                key={article.id}
                href={{
                  pathname: '/articles/[id]',
                  params: { id: article.id },
                }}
                asChild
              >
                <Pressable>
                  <View
                    style={[
                      styles.article,
                      { borderColor: theme.backgroundElement },
                    ]}
                  >
                    <ThemedText
                      key={`article-title-${fontScale}`}
                      accessibilityRole="header"
                      type="title"
                      themeColor="text"
                      style={styles.articleTitle}
                    >
                      {article.title}
                    </ThemedText>
                    <ThemedText
                      key={`article-description-${fontScale}`}
                      themeColor="text"
                      style={styles.description}
                    >
                      {article.description}
                    </ThemedText>
                    <ThemedText
                      key={`article-editorName-${fontScale}`}
                      themeColor="textSecondary"
                      style={styles.meta}
                    >
                      {article.editorName}
                    </ThemedText>
                  </View>
                </Pressable>
              </Link>
            ))}
          </View>
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
  heading: {
    gap: Spacing.three,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
  },
  homeDescription: {
    fontSize: 14,
    lineHeight: 22,
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
  articleSection: {
    gap: Spacing.three,
  },
  articleSectionTitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  article: {
    gap: Spacing.two,
    paddingBottom: Spacing.four,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  articleTitle: {
    fontSize: 20,
    lineHeight: 28,
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
