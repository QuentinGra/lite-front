<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { fetchBookById } from '@/api/admin/book.api'
import { fetchImagesByBookId } from '@/api/admin/image.api'
import { formatDate } from '@/utils/date.utils'
import { capitalizeFirstLetter } from '@/utils/string.utils'
import { Star } from 'lucide-vue-next'
import type { Book } from '@/interfaces/admin/book.interface'
import type { Image } from '@/interfaces/admin/image.interface'

const IMAGE_PATH = import.meta.env.VITE_IMAGE_URL_LOCAL

const router = useRouter()
const route = useRoute()
const book = ref<Book | null>(null)
const bookImage = ref<string | null>(null)
const errorMessage = ref<string>('')

const rating = ref<number>(0)
const hoverRating = ref<number>(0)

const setRating = (value: number): void => {
  rating.value = value
}

const setHoverRating = (value: number): void => {
  hoverRating.value = value
}

const loadBook = async (): Promise<void> => {
  const bookId: number = Number(route.params.id)
  try {
    const data: Book = await fetchBookById(bookId)
    book.value = data

    const images: Image[] = await fetchImagesByBookId(bookId)
    bookImage.value = IMAGE_PATH + images[0].imageName
  } catch (error) {
    errorMessage.value = 'Impossible de charger le livre'
  }
}

onMounted(() => {
  loadBook()
})
</script>

<template>
  <div class="container">
    <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
    <div v-if="book" class="book-detail">
      <div class="book-detail-left">
        <img v-if="bookImage" :src="bookImage" alt="Book cover" class="book-image" />
        <button class="add-to-list">Ajouter à la liste de lecture</button>
        <div class="rate-book">
          <Star
            v-for="star in 5"
            :key="star"
            :class="['star', { 'star-filled': star <= (hoverRating || rating) }]"
            :size="28"
            :stroke-width="2"
            @click="setRating(star)"
            @mouseover="setHoverRating(star)"
            @mouseleave="setHoverRating(0)"
          />
        </div>
      </div>
      <div class="book-detail-right">
        <h1 class="book-title">{{ book.name }}</h1>
        <p class="book-author">
          <span class="book-info">Auteur</span>{{ book.author.lastName }}
          {{ book.author.firstName }}
        </p>
        <div class="book-variants">
          <span v-for="variant in book.bookVariants" :key="variant.id" class="book-variant">
            {{ capitalizeFirstLetter(variant.type) }}
          </span>
        </div>
        <p class="book-description">{{ book.description }}</p>
        <div class="book-categories">
          <span v-for="category in book.categories" :key="category.id" class="book-category">
            <RouterLink :to="{ name: 'CategoryDetail', query: { category: category.id } }">{{
              category.name
            }}</RouterLink>
          </span>
        </div>
        <p class="book-edition">
          <span class="book-info">Maison d'édition</span>{{ book.edition.name }}
        </p>
        <p class="book-date">
          <span class="book-info">Date d'édition</span>{{ formatDate(book.dateEdition) }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.book-detail {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.book-detail-left {
  display: flex;
  flex-direction: column;
}

.book-detail-right {
  @extend .book-detail-left;
  text-align: left;
}

.add-to-list {
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.rate-book {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.star {
  cursor: pointer;
  color: #ccc;
  transition: color 0.2s;
}

.star-filled {
  color: #ffcc00;
}

.book-title {
  font-size: 2rem;
  margin-bottom: 10px;
}

.book-author {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 20px;
}

.book-description {
  font-size: 1rem;
  margin-bottom: 20px;
}

.book-variants {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 1rem;
}

.book-variant {
  background-color: #e0e0e0;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9em;
  color: #333;
}

.book-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;

  a {
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }
  }
}

.book-category {
  background-color: #f4f4f4;
  padding: 5px 10px;
  border-radius: 5px;
}

.book-edition {
  font-size: 1rem;
  color: #333;
  margin-bottom: 10px;
}

.book-date {
  font-size: 1rem;
  color: #666;
}

.book-info {
  font-style: italic;
  font-weight: bold;
  margin-right: 5px;
  font-size: 0.8em;
}
</style>
