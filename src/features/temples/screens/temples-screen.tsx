import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { EmptyState } from '@/components/ui/empty-state';
import { Icon } from '@/components/ui/icon';
import { PictureCard } from '@/components/ui/picture-card';
import { Screen } from '@/components/ui/screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Colors, FontSize, Fonts, Radius, Spacing } from '@/constants/theme';

import { searchTemples } from '../data';

export function TemplesScreen() {
  const [query, setQuery] = useState('');
  const temples = searchTemples(query);

  return (
    <Screen needsNetwork>
      <ScreenHeader title="Temples" />
      <View style={styles.body}>
        <AppText muted>Darshan & directions</AppText>
        <View style={styles.search}>
          <Icon name="search" size={20} color={Colors.muted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search by name or city"
            placeholderTextColor={Colors.placeholder}
            accessibilityLabel="Search temples"
            returnKeyType="search"
            style={styles.input}
          />
        </View>
        {temples.length ? (
          temples.map((temple) => (
            <View key={temple.id} style={styles.card}>
              <PictureCard
                art={temple.art}
                variant={temple.artVariant}
                height={270}
                eyebrow={temple.deity}
                title={temple.name}
                subtitle={temple.place}
                titleSize={FontSize.displayCard}
                onPress={() => router.push(`/temples/${temple.id}`)}
              />
            </View>
          ))
        ) : (
          <View style={styles.card}>
            <EmptyState message={`No temples match “${query}”.`} />
          </View>
        )}
        <AppText variant="xs" muted style={styles.note}>
          Listings only. DivyaPath has no partnership with these temples; hours and facilities
          appear once verified.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: Spacing.gutter,
    paddingTop: Spacing.one,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three - 2,
    height: 54,
    borderRadius: Radius.md,
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.four,
    marginTop: Spacing.four + 2,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: FontSize.lg,
    color: Colors.ink,
  },
  card: {
    marginTop: Spacing.four + 2,
  },
  note: {
    marginTop: Spacing.four,
  },
});
