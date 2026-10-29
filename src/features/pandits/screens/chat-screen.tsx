import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { ChatBubble, TypingBubble } from '@/components/ui/chat-bubble';
import { Composer } from '@/components/ui/composer';
import { Screen } from '@/components/ui/screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Spacing } from '@/constants/theme';

import { chatThread, findBooking, useBookingStore } from '../store/booking-store';

type ChatScreenProps = {
  id?: string;
};

export function ChatScreen({ id }: ChatScreenProps) {
  const booking = findBooking(
    useBookingStore((state) => state.bookings),
    id,
  );
  const chats = useBookingStore((state) => state.chats);
  const typing = useBookingStore((state) => !!state.typing[booking.id]);
  const sendMessage = useBookingStore((state) => state.sendMessage);
  const [draft, setDraft] = useState('');
  const messages = chatThread(chats, booking);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    sendMessage(booking.id, text);
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
          placeholder={`Message ${booking.pandit}`}
        />
      }
    >
      <ScreenHeader title={booking.pandit} />
      <View style={styles.body}>
        <AppText variant="xs" muted style={styles.note}>
          About {booking.ritual} · {booking.date}. Don’t share payment details here; all payments go
          through DivyaPath.
        </AppText>
        {messages.map((message, index) => (
          <ChatBubble key={index} fromMe={message.fromMe} text={message.text} />
        ))}
        {typing ? <TypingBubble /> : null}
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
});
