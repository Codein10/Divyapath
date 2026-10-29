import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Hero } from '@/components/ui/hero';
import { InfoCard } from '@/components/ui/info-card';
import { QtyStepper } from '@/components/ui/qty-stepper';
import { Screen } from '@/components/ui/screen';
import { SectionLabel } from '@/components/ui/section-label';
import { ShareButton } from '@/components/ui/share-button';
import { StatusPill, type PillTone } from '@/components/ui/status-pill';
import { Colors, FontSize, Size, Spacing } from '@/constants/theme';
import { toast } from '@/store/toast-store';
import { addDays, inr, shortDate } from '@/utils/format';

import {
  EMPTY_GIFT,
  type GiftDraft,
  type GiftErrors,
  GiftForm,
  validateGift,
} from '../components/gift-form';
import { DELIVERY_DAYS, DELIVERY_PIN, getProduct, LOW_STOCK } from '../data';
import { selectCartCount, useCartStore } from '../store/cart-store';

type ProductScreenProps = {
  id: string;
};

export function ProductScreen({ id }: ProductScreenProps) {
  const product = getProduct(id);
  const quantity = useCartStore((state) => state.items[product.id] ?? 0);
  const cartCount = useCartStore(selectCartCount);
  const add = useCartStore((state) => state.add);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);
  const [gift, setGift] = useState<GiftDraft>(EMPTY_GIFT);
  const [giftErrors, setGiftErrors] = useState<GiftErrors>({});

  const stock: [string, PillTone] = !product.stock
    ? ['Out of stock', 'err']
    : product.stock <= LOW_STOCK
      ? [`Only ${product.stock} left`, 'warn']
      : ['In stock', 'ok'];

  const addToCart = () => {
    if (!gift.enabled) {
      add(product.id);
      return;
    }
    const errors = validateGift(gift);
    setGiftErrors(errors);
    if (Object.keys(errors).length) {
      toast('Add the gift details');
      return;
    }
    add(product.id, {
      name: gift.name.trim(),
      pin: gift.pin.trim(),
      deliverOn: shortDate(addDays(gift.dayOffset)),
      message: gift.message.trim(),
    });
  };

  const footer = !product.stock ? (
    <Button
      label="Notify me when it’s back"
      variant="outline"
      onPress={() => toast('We’ll let you know when it’s back in stock')}
    />
  ) : quantity ? (
    <>
      <QtyStepper
        large
        value={quantity}
        onIncrement={() => increment(product.id)}
        onDecrement={() => decrement(product.id)}
      />
      <Button label={`Go to cart · ${cartCount}`} flex onPress={() => router.push('/cart')} />
    </>
  ) : (
    <Button label={`Add to cart · ${inr(product.price)}`} onPress={addToCart} />
  );

  return (
    <Screen needsNetwork footer={footer}>
      <Hero art={product.art} variant={product.artVariant} height={Size.heroProduct} back />
      <View style={styles.body}>
        <AppText variant="eyebrow">{product.category.toUpperCase()}</AppText>
        <AppText variant="displayMd" size={34} style={styles.title} accessibilityRole="header">
          {product.name}
        </AppText>
        <View style={styles.priceRow}>
          <AppText weight="bold" size={FontSize.bigPrice} color={Colors.accent}>
            {inr(product.price)}
          </AppText>
          <StatusPill label={stock[0]} tone={stock[1]} />
        </View>
        <AppText variant="lead" style={styles.description}>
          {product.description}
        </AppText>

        <SectionLabel>WHAT’S INSIDE</SectionLabel>
        {product.items.map(([item, qty]) => (
          <View key={item} style={styles.itemRow}>
            <AppText style={styles.itemName}>{item}</AppText>
            <AppText muted align="right">
              {qty}
            </AppText>
          </View>
        ))}

        {product.stock ? <GiftForm draft={gift} errors={giftErrors} onChange={setGift} /> : null}

        <InfoCard style={styles.delivery}>
          <AppText weight="bold">Delivers by {shortDate(addDays(DELIVERY_DAYS))}</AppText>
          <AppText variant="small" muted>
            To {DELIVERY_PIN} · free delivery over ₹999
          </AppText>
          <AppText variant="small" muted>
            Unopened kits can be returned within 7 days.
          </AppText>
        </InfoCard>
        <ShareButton text={`${product.name}, ${inr(product.price)} on DivyaPath`} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: Spacing.gutter,
    paddingTop: Spacing.six + 2,
  },
  title: {
    marginTop: Spacing.one + 2,
    lineHeight: 34 * 1.12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.three,
    marginTop: Spacing.two,
  },
  description: {
    marginTop: Spacing.three + 2,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  itemName: {
    flex: 1,
  },
  delivery: {
    marginTop: Spacing.gutter,
  },
});
