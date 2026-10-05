// Pricing rules in one place, so the cart and any future checkout page can never disagree.

export interface PricedLine {
  qty: number;
  book: { price: number };
}

export interface CartPrice {
  subtotal: number;
  discount: number;
  total: number;
}

export function priceCart(lines: readonly PricedLine[]): CartPrice {
  const subtotal = lines.reduce((sum, l) => sum + l.book.price * l.qty, 0);
  const qualifies = subtotal > DISCOUNT_THRESHOLD;
  const discount = qualifies ? Math.round(subtotal * DISCOUNT_RATE * 100) / 100 : 0;
  return { subtotal, discount, total: subtotal - discount };
}
