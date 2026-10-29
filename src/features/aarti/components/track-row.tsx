import { Pressable, StyleSheet, View } from 'react-native';

import { Art, type ArtKind } from '@/components/art/art';
import { AppText } from '@/components/ui/app-text';
import { Icon } from '@/components/ui/icon';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';

type TrackRowProps = {
  title: string;
  subtitle: string;
  art: ArtKind;
  artVariant?: number;
  active?: boolean;
  playing?: boolean;
  onPlay: () => void;
  disabled?: boolean;
};

/** A track or playlist line with a round play button. */
export function TrackRow({
  title,
  subtitle,
  art,
  artVariant,
  active,
  playing,
  onPlay,
  disabled,
}: TrackRowProps) {
  return (
    <View style={[styles.row, active && styles.active]}>
      <View style={styles.thumb}>
        <Art kind={art} variant={artVariant} />
      </View>
      <View style={styles.text}>
        <AppText weight="semibold" size={FontSize.xl} style={styles.title}>
          {title}
        </AppText>
        <AppText size={FontSize.sm} muted>
          {subtitle}
        </AppText>
      </View>
      <Pressable
        onPress={onPlay}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={`${playing ? 'Pause' : 'Play'} ${title}`}
        style={({ pressed }) => [
          styles.play,
          pressed && styles.pressed,
          disabled && styles.disabled,
        ]}
      >
        <Icon name={playing ? 'pause' : 'play'} size={18} color={Colors.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    padding: Spacing.three + 2,
    marginTop: Spacing.three + 2,
  },
  active: {
    backgroundColor: Colors.highlight,
  },
  thumb: {
    width: 88,
    height: 74,
    borderRadius: 14,
    overflow: 'hidden',
  },
  text: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    lineHeight: FontSize.xl * 1.25,
  },
  play: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.accent2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.4,
  },
});
