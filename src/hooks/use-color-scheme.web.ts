import { useSyncExternalStore } from 'react';
import { Appearance } from 'react-native';

function subscribe(onStoreChange: () => void) {
  const subscription = Appearance.addChangeListener(onStoreChange);
  return () => subscription.remove();
}

function getServerSnapshot() {
  // Keep the initial browser render consistent with the statically rendered HTML.
  return 'light' as const;
}

export function useColorScheme() {
  return useSyncExternalStore(
    subscribe,
    Appearance.getColorScheme,
    getServerSnapshot,
  );
}
