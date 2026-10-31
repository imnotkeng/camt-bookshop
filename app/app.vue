<script setup lang="ts">
const { email, signOut } = useSession();
const { count } = useCart();
const { appVersion } = useRuntimeConfig().public;

async function onSignOut(): Promise<void> {
  signOut();
  await navigateTo('/signin');
}
</script>

<template>
  <header class="topbar">
    <NuxtLink class="brand" to="/books">CAMT Bookshop</NuxtLink>
    <nav v-if="email" class="nav" aria-label="Main">
      <NuxtLink to="/books">Books</NuxtLink>
      <NuxtLink to="/cart">
        Cart<span v-if="count" class="badge" data-testid="cart-count">{{ count }}</span>
      </NuxtLink>
      <span class="who">Signed in as {{ email }}</span>
      <button type="button" class="link" @click="onSignOut">Sign out</button>
    </nav>
  </header>
  <main>
    <NuxtPage />
  </main>
  <footer class="footer">
    CAMT Bookshop · <span data-testid="build">Build {{ appVersion }}</span>
  </footer>
</template>
