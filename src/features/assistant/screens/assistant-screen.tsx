import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { ChatBubble, TypingBubble } from '@/components/ui/chat-bubble';
import { Composer } from '@/components/ui/composer';
import { Screen } from '@/components/ui/screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { TextLink } from '@/components/ui/text-link';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';

import { useAssistantStore } from '../store/assistant-store';
import { SUGGESTIONS } from '../utils/answer';

export function AssistantScreen() {
  const messages = useAssistantStore((state) => state.messages);
  const typing = useAssistantStore((state) => state.typing);
  const ask = useAssistantStore((state) => state.ask);
  const [draft, setDraft] = useState('');

  const send = () => {
    ask(draft);
    setDraft('');
  };

  return (
    <Screen
      needsNetwork
      stickToBottom
      footer={
        <Composer
          value={draft}
          onChangeText={setDraft}
          onSend={send}
          placeholder="Ask about pujas, festivals, kits…"
        />
      }
    >
      <ScreenHeader title="Ask DivyaPath" />
      <View style={styles.body}>
        <AppText variant="xs" muted style={styles.note}>
          Answers draw on DivyaPath’s reviewed guides. Practice differs by region and family; for
          family rituals, ask your family priest. Hindi and English both work.
        </AppText>
        {messages.map(({ fromMe, text, source, action }, index) => (
          <ChatBubble key={index} fromMe={fromMe} text={text}>
            {source ? (
              <AppText variant="xs" muted style={styles.source}>
                Source: {source}
              </AppText>
            ) : null}
            {action ? (
              <TextLink
                label={`${action.label} →`}
                size={FontSize.sm}
                onPress={() => router.push(action.href)}
                style={styles.action}
              />
            ) : null}
          </ChatBubble>
        ))}
        {typing ? <TypingBubble /> : null}
        {messages.length <= 1 ? (
          <View style={styles.suggestions}>
            {SUGGESTIONS.map((question) => (
              <Pressable
                key={question}
                onPress={() => ask(question)}
                accessibilityRole="button"
                style={({ pressed }) => [styles.suggestion, pressed && styles.pressed]}
              >
                <AppText weight="semibold" size={FontSize.sm} color={Colors.accent}>
                  {question}
                </AppText>
              </Pressable>
            ))}
          </View>
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: Spacing.gutter,
  },
  note: {
    marginTop: Spacing.one + 2,
  },
  source: {
    marginTop: Spacing.two,
  },
  action: {
    marginTop: Spacing.one,
  },
  suggestions: {
    alignItems: 'flex-start',
    gap: Spacing.two,
    marginTop: Spacing.four,
  },
  suggestion: {
    borderWidth: 1.5,
    borderColor: Colors.line,
    borderRadius: Radius.md,
    paddingVertical: Spacing.three - 2,
    paddingHorizontal: Spacing.three + 2,
  },
  pressed: {
    backgroundColor: Colors.card,
  },
});
