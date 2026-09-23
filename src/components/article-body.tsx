import { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { Asset } from 'expo-asset';
import { File } from 'expo-file-system';
import { useTheme } from '@/hooks/use-theme';

interface ArticleBodyProps {
  html: string;
}

export default function ArticleBody({ html }: ArticleBodyProps) {
  const { fontScale } = useWindowDimensions();
  const theme = useTheme();
  const [height, setHeight] = useState(1);
  const [fontsBase64, setFontsBase64] = useState<string[] | null>(null);

  useEffect(() => {
    let flag = true;

    const loadFont = async () => {
      try {
        const assets = await Asset.loadAsync([
          require('@/assets/fonts/Pretendard-Regular.woff2'),
          require('@/assets/fonts/Pretendard-SemiBold.woff2'),
        ]);

        const localUris = assets.map((asset) => asset.localUri);
        const loadedFonts: string[] = [];

        for (const localUri of localUris) {
          if (!localUri) {
            throw new Error('Not found local Uri.');
          }

          const file = new File(localUri);
          const fileBase64 = await file.base64();

          loadedFonts.push(fileBase64);
        }

        if (flag) setFontsBase64(loadedFonts);
      } catch (e) {
        console.error(e);

        if (flag) setFontsBase64([]);
      }
    };

    loadFont();

    return () => {
      flag = false;
    };
  }, []);

  const fontCss =
    fontsBase64 && fontsBase64.length === 2
      ? `@font-face {
          font-family: "Pretendard";
          font-weight: 400;
          src: url("data:font/woff2;base64,${fontsBase64[0]}") format("woff2");
        }
        @font-face {
          font-family: "Pretendard";
          font-weight: 600;
          src: url("data:font/woff2;base64,${fontsBase64[1]}") format("woff2");
        }`
      : '';

  const documentHtml = `
    <!doctype html>
    <html lang="ko">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          ${fontCss}
          body {
            margin: 0;
            background: ${theme.background};
            color: ${theme.text};
            font-family: "Pretendard", -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: ${17 * fontScale}px;
            line-height: 1.8;
          }
          #article-body {
            display: flow-root;
            overflow-wrap: anywhere;
            word-break: keep-all;
            letter-spacing: -0.012em;
          }
          h2 {
            margin: 44px 0 18px;
            font-size: 1.2em;
            font-weight: 600;
            line-height: 1.5;
            letter-spacing: -0.025em;
          }
          p {
            margin: 0;
          }
          p + p {
            margin-top: 24px;
          }
          blockquote {
            margin: 32px 0;
            padding: 4px 0 4px 18px;
            border-left: 2px solid ${theme.primary};
            font-size: 1.15em;
            line-height: 1.65;
            font-weight: 600;
            letter-spacing: -0.025em;
          }
        </style>
      </head>
      <body>
        <article id="article-body">${html}</article>
      </body>
    </html>
  `;

  const injectedJavascript = `
    const el = document.getElementById('article-body');
    if (el) {
      let height = el.getBoundingClientRect().height;
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentBoxSize) {
            sendHeight(entry.contentRect.height);
          }
        }
      });
      resizeObserver.observe(el);
      function sendHeight(height) {
        const serializedData = JSON.stringify({
          type: 'content-height',
          height: Math.ceil(height),
        });
        window.ReactNativeWebView.postMessage(serializedData);
      }
      sendHeight(height);
    }
    true;
  `;

  const onMessage = (event: WebViewMessageEvent) => {
    try {
      const rawData: unknown = JSON.parse(event.nativeEvent.data);
      if (typeof rawData !== 'object' || rawData === null) return;
      if ('type' in rawData && 'height' in rawData) {
        if (
          rawData.type === 'content-height' &&
          typeof rawData.height === 'number' &&
          Number.isFinite(rawData.height) &&
          rawData.height > 0
        ) {
          setHeight(rawData.height);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!fontsBase64) {
    return (
      <View
        style={{ height, marginTop: 36, backgroundColor: theme.background }}
      />
    );
  }

  return (
    <View style={{ height, marginTop: 36, backgroundColor: theme.background }}>
      <WebView
        style={{ flex: 1, backgroundColor: theme.background }}
        source={{ html: documentHtml }}
        originWhitelist={['*']}
        scrollEnabled={false}
        onShouldStartLoadWithRequest={(request) =>
          request.url === 'about:blank'
        }
        injectedJavaScript={injectedJavascript}
        onMessage={onMessage}
        startInLoadingState
        renderLoading={() => (
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: theme.background },
            ]}
          />
        )}
      />
    </View>
  );
}
