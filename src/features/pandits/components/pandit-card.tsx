import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Art } from '@/components/art/art';
import { AppText } from '@/components/ui/app-text';
import { Tag } from '@/components/ui/tag';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';
import { inr } from '@/utils/format';

import { type Pandit } from '../data';
import { startingPrice } from '../utils/booking-quote';

type PanditCardProps = {
  pandit: Pandit;
};

export function PanditCard({ pandit }: PanditCardProps) {
  return (
    <Pressable
      onPress={() => router.push(`/pandit/${pandit.id}`)}
      accessibilityRole="button"
      accessibilityLabel={`${pandit.name}, ${pandit.city}, ${pandit.years} years experience`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.photo}>
        <Art
          kind="avatar"
          initials={pandit.initials}
          colorFrom={pandit.colors[0]}
          colorTo={pandit.colors[1]}
        />
      </View>
      <View style={styles.info}>
        <AppText variant="title">{pandit.name}</AppText>
        <AppText muted>
          {pandit.city} · {pandit.years} yrs exp
        </AppText>
        <View style={styles.tags}>
          {pandit.rituals.slice(0, 2).map(([ritual]) => (
            <Tag key={ritual} label={ritual} />
          ))}
        </View>
        <View style={styles.bottom}>
          <AppText weight="bold" size={FontSize.label} color={Colors.ok}>
            ✓ Verified
          </AppText>
          <AppText weight="bold" size={FontSize.price} color={Colors.maroon}>
            from {inr(startingPrice(pandit))}
          </AppText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: Spacing.four,
    backgroundColor: Colors.card,
    borderRadius: Radius.xxl,
    padding: Spacing.four,
    marginTop: Spacing.four,
  },
  pressed: {
    opacity: 0.88,
  },
  photo: {
    width: 116,
    height: 150,
    borderRadius: Radius.md + 2,
    overflow: 'hidden',
  },
  info: {
    flex: 1,
    minWidth: 0,
    gap: Spacing.one + 2,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one + 2,
  },
  bottom: {
    marginTop: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.two,
  },
});
