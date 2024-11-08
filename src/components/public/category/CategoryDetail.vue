<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { fetchCategoryById } from '@/api/admin/category.api'
import type { Category } from '@/interfaces/admin/category.interface'

const IMAGE_PATH = import.meta.env.VITE_IMAGE_URL_LOCAL

const router = useRouter()
const route = useRoute()
const category = ref<Category | null>(null)
const errorMessage = ref<string>('')

const loadCategory = async (): Promise<void> => {
  const categoryId: number = Number(route.params.id)
  try {
    const data: Category = await fetchCategoryById(categoryId)
    category.value = data
  } catch (error) {
    errorMessage.value = 'Impossible de charger la catégorie'
  }
}

const navigateToBookDetail = (bookId: number): void => {
  router.push({ name: 'BookDetail', params: { id: bookId } })
}

onMounted((): void => {
  loadCategory()
})
</script>

<template>
  <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
  <div v-if="category" class="category-detail">
    <h1 class="category-detail-title">{{ category.name }}</h1>
    <p class="category-detail-description">{{ category.description }}</p>
    <div class="book-grid">
      <div v-if="category.books" v-for="book in category.books" :key="book.id" class="book-item">
        <img
          v-if="book.bookImages && book.bookImages[0]"
          :src="IMAGE_PATH + book.bookImages[0].imageName"
          alt="Book cover"
          class="book-image"
        />
        <div class="book-info">
          <h2 class="book-info-title">{{ book.name }}</h2>
          <p class="book-info-author">{{ book.author.lastName }} {{ book.author.firstName }}</p>
        </div>
        <button @click="navigateToBookDetail(book.id)" class="book-button">Voir les Détails</button>
      </div>
    </div>
  </div>
</template>
