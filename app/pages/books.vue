<script setup lang="ts">
const { add } = useCart();
const search = ref('');

const books = computed(() => {
  const term = search.value.trim().toLowerCase();
  return BOOKS.filter(book =>
    !term || book.title.toLowerCase().includes(term) || book.author.toLowerCase().includes(term));
});
</script>

<template>
  <section>
    <h1>Books</h1>
    <label class="search">Search books <input v-model="search" type="search" placeholder="Title or author"></label>
    <p v-if="books.length === 0">No books match your search.</p>
    <ul class="grid">
      <li v-for="book in books" :key="book.id">
        <article class="card book" :aria-labelledby="`title-${book.id}`">
          <h2 :id="`title-${book.id}`">{{ book.title }}</h2>
          <p class="author">{{ book.author }}</p>
          <p class="price">{{ money(book.price) }}</p>
          <button v-if="book.inStock" type="button" @click="add(book.id)">Add to cart</button>
          <button v-else type="button" disabled>Out of stock</button>
        </article>
      </li>
    </ul>
  </section>
</template>
