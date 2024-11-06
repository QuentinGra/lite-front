<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { fetchBookById } from '@/api/admin/book.api'
import { formatDate } from '@/utils/date.utils'
import { capitalizeFirstLetter } from '@/utils/string.utils'
import { useAuth } from '@/composables/useAuth'
import { Star } from 'lucide-vue-next'
import type { Book } from '@/interfaces/admin/book.interface'

const IMAGE_PATH = import.meta.env.VITE_IMAGE_URL_LOCAL

const router = useRouter()
const route = useRoute()
const book = ref<Book | null>(null)
const errorMessage = ref<string>('')

const rating = ref<number>(0)
const hoverRating = ref<number>(0)

const { isUserDefined } = useAuth()

const setRating = (value: number): void => {
  if (!isUserDefined.value) {
    router.push({ name: 'Login' })
    return
  }
  rating.value = value

  // TODO: add in database
}

const setHoverRating = (value: number): void => {
  hoverRating.value = value
}

const loadBook = async (): Promise<void> => {
  const bookId: number = Number(route.params.id)
  try {
    const data: Book = await fetchBookById(bookId)
    book.value = data
  } catch (error) {
    errorMessage.value = 'Impossible de charger le livre'
  }
}

const navigateToCategoryDetail = (categoryId: number): void => {
  router.push({ name: 'CategoryDetail', params: { id: categoryId } })
}

const navigateToAuthorDetail = (authorId: number): void => {
  router.push({ name: 'AuthorDetail', params: { id: authorId } })
}

onMounted((): void => {
  loadBook()
})
</script>

<template>
  <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
  <div v-if="book" class="book-detail">
    <div class="book-detail-left">
      <img :src="IMAGE_PATH + book.bookImages[0].imageName" alt="Book cover" class="book-image" />
      <button class="book-detail-add-to-list">Ajouter à la liste de lecture</button>
      <div class="book-detail-rate-book">
        <Star
          v-for="star in 5"
          :key="star"
          :class="[
            'book-detail-star',
            { 'book-detail-star-filled': star <= (hoverRating || rating) }
          ]"
          :size="28"
          :stroke-width="2"
          @click="setRating(star)"
          @mouseover="setHoverRating(star)"
          @mouseleave="setHoverRating(0)"
        />
      </div>
    </div>
    <div class="book-detail-right">
      <h1 class="book-detail-title">{{ book.name }}</h1>
      <p @click="navigateToAuthorDetail(book.author.id)" class="book-detail-author">
        <span class="book-detail-info">Auteur</span>{{ book.author.lastName }}
        {{ book.author.firstName }}
      </p>
      <div class="book-detail-variants">
        <span v-for="variant in book.bookVariants" :key="variant.id" class="book-detail-variant">
          {{ capitalizeFirstLetter(variant.type) }}
        </span>
      </div>
      <p class="book-detail-description">{{ book.description }}</p>
      <div class="book-detail-categories">
        <span
          v-for="category in book.categories"
          :key="category.id"
          @click="navigateToCategoryDetail(category.id)"
          class="book-detail-category"
        >
          {{ category.name }}
        </span>
      </div>
      <p class="book-detail-edition">
        <span class="book-detail-info">Maison d'édition</span>{{ book.edition.name }}
      </p>
      <p class="book-detail-date">
        <span class="book-detail-info">Date d'édition</span>{{ formatDate(book.dateEdition) }}
      </p>
    </div>
  </div>
</template>
