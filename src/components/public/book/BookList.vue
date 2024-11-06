<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchBooks } from '@/api/admin/book.api'
import type { Book } from '@/interfaces/admin/book.interface'

const IMAGE_PATH = import.meta.env.VITE_IMAGE_URL_LOCAL

const router = useRouter()
const search = ref<string>('')
const books = ref<Book[]>([])
const errorMessage = ref<string>('')

const filteredBooks = computed<Book[]>(() => {
  return books.value.filter((book: Book) =>
    book.name.toLowerCase().startsWith(search.value.toLowerCase())
  )
})

const loadBooks = async (): Promise<void> => {
  try {
    const bookList: Book[] = await fetchBooks()
    books.value = bookList
  } catch (error) {
    errorMessage.value = 'Impossible de charger les livres'
  }
}

const navigateToBookDetail = (bookId: number): void => {
  router.push({ name: 'BookDetail', params: { id: bookId } })
}

onMounted((): void => {
  loadBooks()
})
</script>

<template>
  <h1 class="book-title">Catalogue des Livres</h1>
  <div class="book-filters">
    <input
      type="text"
      v-model="search"
      placeholder="Rechercher un livre..."
      class="book-search"
      aria-label="Rechercher un livre"
    />
  </div>
  <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
  <div class="book-grid">
    <div v-for="book in filteredBooks" :key="book.id" class="book-item">
      <img
        :src="IMAGE_PATH + book.bookImages[0].imageName"
        alt="Book cover"
        class="book-image"
        loading="lazy"
      />
      <div class="book-info">
        <h2 class="book-info-title">{{ book.name }}</h2>
        <p class="book-info-author">{{ book.author.lastName }} {{ book.author.firstName }}</p>
      </div>
      <button @click="navigateToBookDetail(book.id)" class="book-button">Voir les Détails</button>
    </div>
  </div>
  <p v-if="filteredBooks.length === 0" class="book-no-results">
    Aucun livre ne correspond à votre recherche.
  </p>
</template>
