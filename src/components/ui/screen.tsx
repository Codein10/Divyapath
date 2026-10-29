import { StatusBar } from 'expo-status-bar';
import { type ReactNode, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  type ScrollViewInstance,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, FontSize, Spacing } from '@/constants/theme';
import { useSettingsStore } from '@/store/settings-store';

import { AppText } from './app-text';
import { FooterContext } from './footer-context';
import { Icon } from './icon';
import { OfflineState } from './offline-state';
import { type Tone, ToneProvider } from './tone';

type ScreenProps = {
  children: ReactNode;
  /** Sticky buttons at the bottom (Pay, Proceed, Next). */
  footer?: ReactNode;
  /** Floating elements on top of the content (Ask button). */
  overlay?: ReactNode;
  tone?: Tone;
  /** Screens that need the internet show the offline state while offline mode is on. */
  needsNetwork?: boolean;
  /** Tab screens: the tab bar already handles the bottom safe area. */
  inTabs?: boolean;
  /** Chat screens keep the newest message in view. */
  stickToBottom?: boolean;
};

/** The frame of every screen: background, safe areas, scrolling, footer and offline handling. */
export function Screen({
  children,
  footer,
  overlay,
  tone = 'light',
  needsNetwork,
  inTabs,
  stickToBottom,
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const offline = useSettingsStore((state) => state.offline);
  const scrollRef = useRef<ScrollViewInstance>(null);
  const isDark = tone === 'dark';
  const blocked = needsNetwork && offline;
  const bottomInset = inTabs ? 0 : insets.bottom;

  return (
    <ToneProvider tone={tone}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[
          styles.root,
          { paddingTop: insets.top, backgroundColor: isDark ? Colors.night : Colors.bg },
        ]}
      >
        {offline ? (
          <View style={styles.offlineBar} accessibilityRole="alert">
            <Icon name="wifiOff" size={16} color={Colors.white} />
            <AppText size={FontSize.label} color={Colors.white}>
              Offline · showing saved content
            </AppText>
          </View>
        ) : null}
        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={{
            paddingBottom: (footer && !blocked ? Spacing.four : Spacing.seven) + bottomInset,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => {
            if (stickToBottom) scrollRef.current?.scrollToEnd({ animated: true });
          }}
        >
          {blocked ? <OfflineState /> : children}
        </ScrollView>
        {footer && !blocked ? (
          <View
            style={[
              styles.footer,
              {
                paddingBottom: Spacing.four + bottomInset,
                backgroundColor: isDark ? Colors.night : Colors.bg,
              },
            ]}
          >
            <FooterContext value>{footer}</FooterContext>
          </View>
        ) : null}
        {blocked ? null : overlay}
      </KeyboardAvoidingView>
    </ToneProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  offlineBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: Colors.ink,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.five,
  },
  footer: {
    flexDirection: 'row',
    gap: Spacing.three,
    paddingTop: Spacing.three,
    paddingHorizontal: Spacing.gutter,
  },
});
