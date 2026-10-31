<script setup lang="ts">
const route = useRoute();
const order = useOrders().find(String(route.params.ref));
</script>

<template>
  <section class="card">
    <template v-if="order">
      <h1>Order confirmed</h1>
      <p>Order reference <strong data-testid="order-ref">{{ order.ref }}</strong></p>
      <p>Total paid: <span data-testid="order-total">{{ money(order.total) }}</span></p>
      <NuxtLink to="/books">Continue shopping</NuxtLink>
    </template>
    <h1 v-else>Order not found</h1>
  </section>
</template>
