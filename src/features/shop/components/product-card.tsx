import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Art } from '@/components/art/art';
import { AppText } from '@/components/ui/app-text';
import { QtyStepper } from '@/components/ui/qty-stepper';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';
import { inr } from '@/utils/format';

import { LOW_STOCK, type Product } from '../data';
import { useCartStore } from '../store/cart-store';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const quantity = useCartStore((state) => state.items[product.id] ?? 0);
  const add = useCartStore((state) => state.add);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);
  const open = () => router.push(`/product/${product.id}`);
  const lowStock = product.stock > 0 && product.stock <= LOW_STOCK;

  return (
    <View style={styles.card}>
      <Pressable
        onPress={open}
        accessibilityRole="button"
        accessibilityLabel={`View ${product.name}`}
        style={styles.image}
      >
        <Art kind={product.art} variant={product.artVariant} />
        {lowStock ? (
          <View style={styles.lowTag}>
            <AppText weight="bold" size={12} color={Colors.warn}>
              Only {product.stock} left
            </AppText>
          </View>
        ) : null}
      </Pressable>
      <View style={styles.body}>
        <Pressable onPress={open} accessibilityElementsHidden importantForAccessibility="no">
          <AppText weight="semibold" size={FontSize.lg} numberOfLines={2} style={styles.name}>
            {product.name}
          </AppText>
        </Pressable>
        <View style={styles.row}>
          <AppText weight="bold" size={FontSize.price} color={Colors.maroon}>
            {inr(product.price)}
          </AppText>
          {!product.stock ? (
            <AppText weight="bold" size={FontSize.xs} color={Colors.err}>
              Sold out
            </AppText>
          ) : quantity ? (
            <QtyStepper
              value={quantity}
              onIncrement={() => increment(product.id)}
              onDecrement={() => decrement(product.id)}
            />
          ) : (
            <Pressable
              onPress={() => add(product.id)}
              accessibilityRole="button"
              accessibilityLabel={`Add ${product.name} to cart`}
              style={({ pressed }) => [styles.add, pressed && styles.pressed]}
            >
              <AppText weight="bold" color={Colors.white}>
                Add
              </AppText>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    flexGrow: 1,
    backgroundColor: Colors.card,
    borderRadius: Radius.xl + 2,
    overflow: 'hidden',
  },
  image: {
    height: 168,
    backgroundColor: Colors.card2,
  },
  lowTag: {
    position: 'absolute',
    left: Spacing.three - 2,
    top: Spacing.three - 2,
    backgroundColor: Colors.bg,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.three - 2,
  },
  body: {
    flex: 1,
    padding: Spacing.three + 2,
    gap: Spacing.three - 2,
  },
  name: {
    minHeight: 44,
  },
  row: {
    marginTop: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.two,
  },
  add: {
    height: 40,
    paddingHorizontal: Spacing.four + 2,
    borderRadius: Radius.pill,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
});
