import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Art } from '@/components/art/art';
import { AppText } from '@/components/ui/app-text';
import { Icon, type IconName } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Colors, FontSize, Radius, Shadow, Spacing } from '@/constants/theme';
import { goBack } from '@/services/navigation';

import { findPanditByName } from '../data';
import { findBooking, useBookingStore } from '../store/booking-store';

type CallButtonProps = {
  icon: IconName;
  label: string;
  active?: boolean;
  danger?: boolean;
  onPress: () => void;
};

function CallButton({ icon, label, active, danger, onPress }: CallButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: !!active }}
      style={[styles.callButton, active && styles.callButtonOn, danger && styles.end]}
    >
      <Icon name={icon} size={24} color={active ? Colors.night : Colors.white} />
    </Pressable>
  );
}

type CallScreenProps = {
  id?: string;
};

export function CallScreen({ id }: CallScreenProps) {
  const booking = findBooking(
    useBookingStore((state) => state.bookings),
    id,
  );
  const pandit = findPanditByName(booking.pandit);
  const [muted, setMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);

  return (
    <Screen tone="dark" needsNetwork>
      <ScreenHeader eyebrow="ONLINE PUJA" backLabel="Leave call" />
      <View style={styles.body}>
        <View style={styles.avatar}>
          <Art
            kind="avatar"
            initials={pandit.initials}
            colorFrom={pandit.colors[0]}
            colorTo={pandit.colors[1]}
          />
        </View>
        <AppText variant="displayMd" color={Colors.white} style={styles.name}>
          {pandit.name}
        </AppText>
        <AppText muted align="center">
          Waiting for the pandit to join · {booking.ritual}
        </AppText>
        <View style={styles.selfView}>
          <AppText size={FontSize.label} color={Colors.nightText}>
            {cameraOn ? 'You' : 'Camera off'}
          </AppText>
        </View>
        <View style={styles.controls}>
          <CallButton
            icon="mic"
            label={muted ? 'Unmute' : 'Mute'}
            active={muted}
            onPress={() => setMuted(!muted)}
          />
          <CallButton
            icon="camera"
            label={cameraOn ? 'Turn camera off' : 'Turn camera on'}
            active={!cameraOn}
            onPress={() => setCameraOn(!cameraOn)}
          />
          <CallButton icon="endCall" label="End call" danger onPress={goBack} />
        </View>
        <AppText variant="xs" muted align="center" style={styles.note}>
          Video runs through [video provider]. Calls are not recorded.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    paddingHorizontal: Spacing.gutter,
    paddingTop: Spacing.six + 2,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    boxShadow: Shadow.goldRing,
  },
  name: {
    marginTop: Spacing.four + 2,
  },
  selfView: {
    alignSelf: 'flex-end',
    marginTop: Spacing.six,
    width: 110,
    height: 146,
    borderRadius: Radius.md + 2,
    backgroundColor: Colors.night2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    flexDirection: 'row',
    gap: Spacing.gutter,
    marginTop: Spacing.gutter,
  },
  callButton: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: Colors.night2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callButtonOn: {
    backgroundColor: Colors.white,
  },
  end: {
    backgroundColor: Colors.err,
  },
  note: {
    marginTop: Spacing.four + 2,
  },
});
