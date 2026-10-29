import { Linking, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Hero } from '@/components/ui/hero';
import { InfoCard } from '@/components/ui/info-card';
import { InfoRow } from '@/components/ui/info-row';
import { Screen } from '@/components/ui/screen';
import { Colors, FontSize, Size, Spacing } from '@/constants/theme';
import { toast } from '@/store/toast-store';

import { getTemple } from '../data';

const DETAILS: [label: string, value: string][] = [
  ['Address', '[Verified address pending]'],
  ['Opening hours', '[Published hours pending]'],
  ['Facilities', 'Shown once verified'],
  ['Live stream', 'No authorised stream yet'],
];

type TempleScreenProps = {
  id?: string;
};

export function TempleScreen({ id }: TempleScreenProps) {
  const temple = getTemple(id);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${temple.name} ${temple.place}`)}`;

  return (
    <Screen needsNetwork>
      <Hero art={temple.art} variant={temple.artVariant} shade back height={Size.heroDetail}>
        <AppText variant="eyebrow" color={Colors.gold}>
          {temple.deity}
        </AppText>
        <AppText variant="displayHero" color={Colors.onImage} accessibilityRole="header">
          {temple.name}
        </AppText>
        <AppText size={FontSize.lg} color={Colors.peach}>
          {temple.place}
        </AppText>
      </Hero>
      <View style={styles.body}>
        {DETAILS.map(([label, value]) => (
          <InfoRow key={label} label={label}>
            {value}
          </InfoRow>
        ))}
        <InfoCard style={styles.card}>
          <AppText weight="bold">Donations</AppText>
          <AppText variant="small" muted>
            Not available. This temple’s trust hasn’t been verified on DivyaPath, so we don’t
            collect money for it.
          </AppText>
        </InfoCard>
        <View style={styles.buttons}>
          <Button label="Get directions" onPress={() => Linking.openURL(mapsUrl)} />
          <Button
            label="Suggest a correction"
            variant="outline"
            onPress={() => toast('Thanks. Our editors will review it.')}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: Spacing.gutter,
    paddingTop: Spacing.three + 2,
  },
  card: {
    marginTop: Spacing.four + 2,
  },
  buttons: {
    gap: Spacing.three + 2,
    marginTop: Spacing.gutter,
  },
});
