import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { FlameMark } from '@/components/ui/icon';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';
import { useT } from '@/hooks/use-t';
import { plural } from '@/utils/format';

import { practiceTotals, usePracticeStore } from '../store/practice-store';

export function StreakCard() {
  const t = useT();
  const logs = usePracticeStore((state) => state.logs);
  const { sessions, minutes } = practiceTotals(logs);

  return (
    <View style={styles.card}>
      <View style={styles.text}>
        <AppText
          variant="displayLg"
          size={FontSize.streak}
          color={Colors.peach}
          style={styles.number}
        >
          {sessions ? 1 : 0}
        </AppText>
        <AppText weight="semibold" size={FontSize.xl} color={Colors.nightDesc}>
          {t('streak')}
        </AppText>
        <AppText size={FontSize.sm} color={Colors.nightText}>
          {plural(sessions, 'session')} · {minutes} min today
        </AppText>
      </View>
      <View style={styles.flame}>
        <FlameMark />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.night2,
    borderRadius: Radius.xxl,
    paddingVertical: Spacing.six + 2,
    paddingHorizontal: Spacing.seven,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.four,
    marginTop: Spacing.four + 2,
  },
  text: {
    flex: 1,
  },
  number: {
    lineHeight: FontSize.streak,
  },
  flame: {
    width: 64,
    height: 84,
    borderRadius: 32,
    backgroundColor: Colors.accent2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
