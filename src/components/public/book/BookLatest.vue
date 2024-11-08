<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchLatestBooks } from '@/api/admin/book.api'
import type { Book } from '@/interfaces/admin/book.interface'

const IMAGE_PATH = import.meta.env.VITE_IMAGE_URL_LOCAL

const latestBooks = ref<Book[]>([])
const errorMessage = ref<string>('')

const loadLatestBooks = async (): Promise<void> => {
  try {
    const data: Book[] = await fetchLatestBooks()
    latestBooks.value = data
  } catch (error) {
    errorMessage.value = 'Impossible de charger les livres'
  }
}

onMounted((): void => {
  loadLatestBooks()
})
</script>

<template>
  <div class="book-grid">
    <div v-for="book in latestBooks" :key="book.id" class="book-item">
      <img
        v-if="book.bookImages && book.bookImages[0]"
        :src="IMAGE_PATH + book.bookImages[0].imageName"
        :alt="book.name"
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
</template>
