import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Art } from '@/components/art/art';
import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Icon, type IconName } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { SectionLabel } from '@/components/ui/section-label';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';
import { goToTab } from '@/services/navigation';
import { toast } from '@/store/toast-store';

import { LiveBadge } from '../components/live-badge';
import { LIVE_SCHEDULE } from '../data';
import { usePlayerStore } from '../store/player-store';

type VideoButtonProps = { icon: IconName; label: string; onPress: () => void };

function VideoButton({ icon, label, onPress }: VideoButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={styles.videoButton}
    >
      <Icon name={icon} size={20} color={Colors.white} />
    </Pressable>
  );
}

type PillButtonProps = { label: string; selected?: boolean; onPress: () => void };

function SchedulePill({ label, selected, onPress }: PillButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      style={[styles.pill, selected && styles.pillOn]}
    >
      <AppText
        weight="semibold"
        size={FontSize.label}
        color={selected ? Colors.night2 : Colors.nightInk}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

export function LiveScreen() {
  const reminders = usePlayerStore((state) => state.reminders);
  const toggleReminder = usePlayerStore((state) => state.toggleReminder);

  return (
    <Screen tone="dark" needsNetwork>
      <ScreenHeader eyebrow="LIVE DARSHAN" />
      <View style={styles.video}>
        <Art kind="aarti" />
        <LiveBadge />
        <View style={styles.soundNote}>
          <AppText size={FontSize.xs} color={Colors.nightDesc}>
            Sound off
          </AppText>
        </View>
        <View style={styles.videoControls}>
          <VideoButton icon="pause" label="Pause" onPress={() => undefined} />
          <VideoButton
            icon="mute"
            label="Unmute"
            onPress={() => toast('Sound on. Streams always start muted.')}
          />
          <View style={styles.spacer} />
          <VideoButton icon="fullscreen" label="Full screen" onPress={() => undefined} />
        </View>
      </View>

      <View style={styles.body}>
        <AppText variant="displayMd" color={Colors.white}>
          Sandhya Aarti
        </AppText>
        <AppText muted>[Partner temple name], [City] · started 6:30 pm IST</AppText>
        <View style={styles.buttons}>
          <Button
            label="Aarti lyrics"
            variant="outline"
            size="sm"
            flex
            onPress={() => goToTab('/aarti')}
          />
          <Button label="Donate" size="sm" flex onPress={() => router.push('/donate')} />
        </View>
        <AppText variant="xs" muted style={styles.gapTop}>
          Donations go to the temple trust’s registered account, with a receipt.
        </AppText>

        <SectionLabel>TODAY’S SCHEDULE</SectionLabel>
        {LIVE_SCHEDULE.map(([time, name, state], index) => (
          <View key={name} style={styles.row}>
            <AppText weight="semibold" size={FontSize.sm} color={Colors.gold} style={styles.time}>
              {time}
            </AppText>
            <View style={styles.rowText}>
              <AppText weight="semibold" color={Colors.white}>
                {name}
              </AppText>
              <AppText variant="xs" muted>
                {state === 'ended' ? 'Ended' : state === 'live' ? 'On air now' : 'Tonight'}
              </AppText>
            </View>
            {state === 'live' ? (
              <View style={styles.livePill}>
                <AppText weight="bold" size={FontSize.xs} color={Colors.white}>
                  LIVE
                </AppText>
              </View>
            ) : state === 'next' ? (
              <SchedulePill
                label={reminders[index] ? 'Reminder on' : 'Remind me'}
                selected={!!reminders[index]}
                onPress={() => toggleReminder(index)}
              />
            ) : (
              <SchedulePill
                label="Replay"
                onPress={() => toast('Replays open where the temple allows recordings')}
              />
            )}
          </View>
        ))}

        <View style={[styles.row, styles.offlineRow]}>
          <Icon name="wifiOff" size={24} color={Colors.gold} />
          <View style={styles.rowText}>
            <AppText weight="semibold" color={Colors.white}>
              Kakad Aarti · [Second temple]
            </AppText>
            <AppText variant="xs" muted>
              Stream offline. We’ll tell you when it’s back.
            </AppText>
          </View>
          <SchedulePill
            label="Retry"
            onPress={() => toast('Still offline. We’ll notify you when it’s back.')}
          />
        </View>
        <AppText variant="xs" muted style={styles.gapTop}>
          Streams come from an authorised provider with the temple’s permission. This demo shows no
          real video.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  video: {
    aspectRatio: 16 / 10,
    backgroundColor: Colors.videoBg,
    marginTop: Spacing.three + 2,
    overflow: 'hidden',
  },
  soundNote: {
    position: 'absolute',
    right: Spacing.three + 2,
    top: Spacing.four,
    backgroundColor: Colors.videoNote,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three - 2,
    borderRadius: Radius.pill,
  },
  videoControls: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    gap: Spacing.three - 2,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three + 2,
  },
  videoButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.videoButton,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    flex: 1,
  },
  body: {
    paddingHorizontal: Spacing.gutter,
    paddingTop: Spacing.five,
  },
  buttons: {
    flexDirection: 'row',
    gap: Spacing.three - 2,
    marginTop: Spacing.four,
  },
  gapTop: {
    marginTop: Spacing.three - 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    backgroundColor: Colors.night2,
    borderRadius: Radius.md + 2,
    paddingVertical: Spacing.three + 2,
    paddingHorizontal: Spacing.four,
    marginTop: Spacing.three - 2,
  },
  offlineRow: {
    marginTop: Spacing.four,
  },
  time: {
    width: 68,
  },
  rowText: {
    flex: 1,
    minWidth: 0,
  },
  livePill: {
    backgroundColor: Colors.live,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
  },
  pill: {
    height: 40,
    paddingHorizontal: Spacing.three + 2,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    borderColor: Colors.nightLine,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillOn: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
});
