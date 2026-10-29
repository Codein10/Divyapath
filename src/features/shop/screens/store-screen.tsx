import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { EmptyState } from '@/components/ui/empty-state';
import { FeatureRow } from '@/components/ui/feature-row';
import { HScroll } from '@/components/ui/h-scroll';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Screen } from '@/components/ui/screen';
import { Skeleton } from '@/components/ui/skeleton';
import { Colors, Spacing } from '@/constants/theme';
import { useT } from '@/hooks/use-t';
import { plural } from '@/utils/format';

import { useProducts } from '../api/use-products';
import { ProductCard } from '../components/product-card';
import { CATEGORIES, DELIVERY_PIN } from '../data';
import { selectCartCount, useCartStore } from '../store/cart-store';

type Category = (typeof CATEGORIES)[number];

export function StoreScreen() {
  const t = useT();
  const [category, setCategory] = useState<Category>('All');
  const cartCount = useCartStore(selectCartCount);
  const { data: products, isPending, isError, refetch } = useProducts();
  const visible = (products ?? []).filter((p) => category === 'All' || p.category === category);

  return (
    <Screen inTabs needsNetwork>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <AppText variant="displayLg" accessibilityRole="header">
            {t('storeT')}
          </AppText>
          <AppText muted>{t('storeS')}</AppText>
        </View>
        <IconButton
          onPress={() => router.push('/cart')}
          accessibilityLabel={`Cart, ${plural(cartCount, 'item')}`}
          badge={cartCount}
        >
          <Icon name="bag" size={26} color={Colors.ink} />
        </IconButton>
      </View>

      <View style={styles.chips}>
        <HScroll accessibilityLabel="Category">
          {CATEGORIES.map((c) => (
            <Chip key={c} label={c} selected={category === c} onPress={() => setCategory(c)} />
          ))}
        </HScroll>
      </View>

      <View style={styles.grid}>
        {isPending ? (
          [0, 1, 2, 3].map((key) => (
            <View key={key} style={styles.skeletonCell}>
              <Skeleton height={262} />
            </View>
          ))
        ) : isError ? (
          <View style={styles.full}>
            <EmptyState
              title="Couldn’t load the store"
              message="Check your connection and try again."
            >
              <Button label="Try again" onPress={() => refetch()} />
            </EmptyState>
          </View>
        ) : visible.length ? (
          visible.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <View style={styles.full}>
            <EmptyState message={`No ${category.toLowerCase()} products right now.`} />
          </View>
        )}
      </View>

      <View style={styles.pad}>
        <FeatureRow
          art="incense"
          title="Never run out of daily puja items"
          subtitle="Refills on a schedule · save 10%"
          onPress={() => router.push('/subscription')}
        />
        <AppText variant="xs" muted style={styles.note}>
          Prices and stock are demo data. Delivering to {DELIVERY_PIN}.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.three,
    paddingHorizontal: Spacing.gutter,
    paddingTop: Spacing.gutter,
  },
  headerText: {
    flex: 1,
  },
  chips: {
    marginTop: Spacing.five,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.four,
    paddingHorizontal: Spacing.gutter,
    marginTop: Spacing.five,
  },
  skeletonCell: {
    width: '47%',
    flexGrow: 1,
  },
  full: {
    width: '100%',
  },
  pad: {
    paddingHorizontal: Spacing.gutter,
  },
  note: {
    marginTop: Spacing.four,
  },
});
