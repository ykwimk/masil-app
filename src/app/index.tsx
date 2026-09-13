import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isLoaded } from 'expo-font';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { dummyArticles } from '@/data/articles';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/themed-text';

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
        <ThemedText
          key={`sample-label-${fontScale}`}
          themeColor="textSecondary"
          style={styles.meta}
        >
          예시 콘텐츠
        </ThemedText>
        {dummyArticles.map((article) => (
          <View
            key={article.id}
            style={[styles.article, { borderColor: theme.backgroundElement }]}
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
