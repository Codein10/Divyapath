import { cartTotals } from './cart-totals';

describe('cartTotals', () => {
  it('is all zero for an empty cart', () => {
    expect(cartTotals({}, [])).toMatchObject({ count: 0, subtotal: 0, shipping: 0, total: 0 });
  });

  it('charges delivery under ₹999', () => {
    // Agarbatti ₹249 × 2
    const totals = cartTotals({ agarbatti: 2 }, []);
    expect(totals).toMatchObject({ count: 2, subtotal: 498, shipping: 79, total: 577 });
  });

  it('delivers free from ₹999 and adds gift wrap per gifted product', () => {
    // Diwali kit ₹1,499 + agarbatti ₹249, with the kit gifted
    const totals = cartTotals({ diwali: 1, agarbatti: 1 }, ['diwali']);
    expect(totals).toMatchObject({ subtotal: 1748, giftWrap: 49, shipping: 0, total: 1797 });
  });

  it('ignores gift details for products no longer in the cart', () => {
    expect(cartTotals({ diwali: 1 }, ['holi']).giftWrap).toBe(0);
  });

  it('shows the GST already included in the total', () => {
    expect(Math.round(cartTotals({ diwali: 1 }, []).gstIncluded)).toBe(161);
  });
});
