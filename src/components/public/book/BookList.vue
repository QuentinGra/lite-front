<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { fetchBooks } from '@/api/admin/book.api'
import { fetchImagesByBookId } from '@/api/admin/image.api'
import type { Book } from '@/interfaces/admin/book.interface'
import type { Image } from '@/interfaces/admin/image.interface'

const IMAGE_PATH = import.meta.env.VITE_IMAGE_URL_LOCAL

const search = ref<string>('')
const books = ref<Book[]>([])
const bookImages = ref<{ [key: number]: Image[] }>({})
const errorMessage = ref<string>('')

const filteredBooks = computed<Book[]>(() => {
  return books.value.filter((book: Book) =>
    book.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

const loadBooks = async (): Promise<void> => {
  try {
    const bookList: Book[] = await fetchBooks()
    books.value = bookList

    const imagePromises = bookList.map(async (book) => {
      const images: Image[] = await fetchImagesByBookId(book.id)
      bookImages.value[book.id] = images
    })
    await Promise.all(imagePromises)
  } catch (error) {
    errorMessage.value = 'Impossible de charger les livres'
  }
}

onMounted(() => {
  loadBooks()
})
</script>

<template>
  <div class="container">
    <h1 class="page-title">Catalogue des Livres</h1>
    <div class="container-search">
      <label for="search-input" class="search-label">Rechercher un livre</label>
      <input type="text" v-model="search" placeholder="Titre" class="search-input" />
    </div>
    <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
    <ul class="book-list">
      <li v-for="book in filteredBooks" :key="book.id" class="book-item">
        <RouterLink :to="{ name: 'BookDetail', params: { id: book.id } }" class="book-link">
          <img
            v-if="bookImages[book.id] && bookImages[book.id].length"
            :src="IMAGE_PATH + bookImages[book.id][0].imageName"
            alt="Book cover"
            class="book-image"
          />
          <div class="book-info">
            <h2 class="book-title">{{ book.name }}</h2>
            <p class="book-author">{{ book.author.lastName }} {{ book.author.firstName }}</p>
          </div>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.page-title {
  font-size: 1.7rem;
  text-align: left;
}

.container-search {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;

  .search-label {
    font-size: 0.9rem;
    color: #333;
    margin-bottom: 5px;
  }

  .search-input {
    width: 100%;
    max-width: 400px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
    }
  }
}
</style>
