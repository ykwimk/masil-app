import { type ComponentProps } from 'react';
import { Href, Link } from 'expo-router';
import {
  openBrowserAsync,
  WebBrowserPresentationStyle,
} from 'expo-web-browser';
import { Alert } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: Href & string;
};

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (process.env.EXPO_OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          try {
            await openBrowserAsync(href, {
              presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
            });
          } catch {
            Alert.alert('링크를 열지 못했어요', '잠시 후 다시 시도해 주세요.');
          }
        }
      }}
    />
  );
}
