<script setup lang="ts">
const cart = useCart();
const { place } = useOrders();

const lines = computed(() =>
  cart.lines.value
    .map(line => ({ ...line, book: findBook(line.id) }))
    .filter((line): line is typeof line & { book: Book } => !!line.book));

const pricing = computed(() => priceCart(lines.value));
const subtotal = computed(() => pricing.value.subtotal);
const discount = computed(() => pricing.value.discount);
const total = computed(() => pricing.value.total);

// The third-party exchange-rate service, called once per visit to the cart.
// retry: 0 because $fetch silently retries a failed GET once by default.
const rate = ref<number | null>(null);
const rateFailed = ref(false);

onMounted(async () => {
  try {
    const { THB_per_USD } = await $fetch<{ THB_per_USD: number }>('/api/rates', { retry: 0 });
    rate.value = THB_per_USD;
  } catch {
    rateFailed.value = true;
  }
});

const fx = computed(() => {
  if (rateFailed.value) return 'Exchange rate unavailable';
  if (rate.value === null) return 'Converting to USD…';
  return `≈ ${(total.value / rate.value).toFixed(2)} USD`;
});

async function placeOrder(): Promise<void> {
  const order = place(total.value);
  cart.clear();
  await navigateTo(`/order/${order.ref}`);
}
</script>

<template>
  <section class="card">
    <h1>Your cart</h1>

    <template v-if="lines.length === 0">
      <p>Your cart is empty.</p>
      <button type="button" disabled>Place order</button>
    </template>

    <template v-else>
      <table>
        <thead><tr><th>Book</th><th>Qty</th><th>Line total</th><th /></tr></thead>
        <tbody>
          <tr v-for="line in lines" :key="line.id">
            <td>{{ line.book.title }}</td>
            <td>{{ line.qty }}</td>
            <td>{{ money(line.book.price * line.qty) }}</td>
            <td>
              <button type="button" class="link" :aria-label="`Remove ${line.book.title}`" @click="cart.remove(line.id)">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <dl class="totals">
        <dt>Subtotal</dt><dd data-testid="subtotal">{{ money(subtotal) }}</dd>
        <template v-if="discount">
          <dt>Member discount</dt><dd data-testid="discount">-{{ money(discount) }}</dd>
        </template>
        <dt>Total</dt><dd data-testid="total">{{ money(total) }}</dd>
      </dl>
      <p class="fx" data-testid="fx">{{ fx }}</p>
      <button type="button" @click="placeOrder">Place order</button>
    </template>
  </section>
</template>
