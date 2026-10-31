<script setup lang="ts">
const { signIn } = useSession();

const email = ref('');
const password = ref('');
const error = ref('');

async function onSubmit(): Promise<void> {
  error.value = '';
  try {
    const result = await $fetch<{ email: string }>('/api/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    });
    signIn(result.email);
    await navigateTo('/books');
  } catch {
    error.value = 'Incorrect email or password.';
  }
}
</script>

<template>
  <section class="card narrow">
    <h1>Sign in</h1>
    <form novalidate @submit.prevent="onSubmit">
      <label>Email <input v-model="email" name="email" type="email" autocomplete="username" required></label>
      <label>Password <input v-model="password" name="password" type="password" autocomplete="current-password" required></label>
      <p v-if="error" class="error" role="alert">{{ error }}</p>
      <button type="submit">Log in</button>
    </form>
  </section>
</template>
