import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';
import { useT } from '@/hooks/use-t';
import { useSettingsStore } from '@/store/settings-store';

// Sample values; live data will come from a documented panchang source.
const SAMPLE = {
  tithi: 'Trayodashi',
  nakshatra: 'Magha',
  sunrise: '06:12',
  sunset: '18:34',
  muhurat: '11:48 – 12:34',
};

export function PanchangCard() {
  const t = useT();
  const city = useSettingsStore((state) => state.city);

  return (
    <View style={styles.card}>
      <AppText variant="eyebrow">{t('panchang')}</AppText>
      <AppText variant="displayHero" style={styles.tithi}>
        {SAMPLE.tithi}
      </AppText>
      <AppText muted>Nakshatra · {SAMPLE.nakshatra}</AppText>

      <View style={styles.times}>
        <View style={styles.time}>
          <AppText size={FontSize.label} muted>
            {t('sunrise')}
          </AppText>
          <AppText weight="bold" size={FontSize.xxl}>
            {SAMPLE.sunrise}
          </AppText>
        </View>
        <View style={styles.time}>
          <AppText size={FontSize.label} muted>
            {t('sunset')}
          </AppText>
          <AppText weight="bold" size={FontSize.xxl}>
            {SAMPLE.sunset}
          </AppText>
        </View>
      </View>

      <View style={styles.muhurat}>
        <AppText weight="semibold" size={FontSize.label} color={Colors.peachInk}>
          {t('muhurat')}
        </AppText>
        <AppText weight="bold" size={FontSize.xxl} color={Colors.peachInk}>
          {SAMPLE.muhurat}
        </AppText>
      </View>
      <AppText variant="xs" muted style={styles.note}>
        Sample values for {city}. Live data comes from a documented panchang source.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xxl,
    paddingVertical: Spacing.six,
    paddingHorizontal: Spacing.six + 2,
    gap: Spacing.one,
  },
  tithi: {
    marginTop: Spacing.two,
  },
  times: {
    flexDirection: 'row',
    gap: Spacing.three,
    marginTop: Spacing.three + 2,
  },
  time: {
    flex: 1,
  },
  muhurat: {
    backgroundColor: Colors.peach,
    borderRadius: Radius.md,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four + 2,
    marginTop: Spacing.three + 2,
  },
  note: {
    marginTop: Spacing.three - 2,
  },
});
