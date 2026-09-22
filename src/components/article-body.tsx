import { useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { useTheme } from '@/hooks/use-theme';

interface ArticleBodyProps {
  html: string;
}

export default function ArticleBody({ html }: ArticleBodyProps) {
  const { fontScale } = useWindowDimensions();
  const theme = useTheme();
  const [height, setHeight] = useState(1);

  const documentHtml = `
    <!doctype html>
    <html lang="ko">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          body {
            margin: 0;
            background: ${theme.background};
            color: ${theme.text};
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: ${17 * fontScale}px;
            line-height: 1.8;
          }
          #article-body {
            display: flow-root;
            overflow-wrap: anywhere;
          }
          p {
            margin: 0 0 24px;
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

  return (
    <View style={{ height, marginTop: 36 }}>
      <WebView
        style={{ flex: 1 }}
        source={{ html: documentHtml }}
        originWhitelist={['*']}
        scrollEnabled={false}
        onShouldStartLoadWithRequest={(request) =>
          request.url === 'about:blank'
        }
        injectedJavaScript={injectedJavascript}
        onMessage={onMessage}
      />
    </View>
  );
}
