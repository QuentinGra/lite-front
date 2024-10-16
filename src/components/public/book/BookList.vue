<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchBooks } from '@/api/admin/book.api'
import { fetchImagesByBookId } from '@/api/admin/image.api'
import type { Book } from '@/interfaces/admin/book.interface'
import type { Image } from '@/interfaces/admin/image.interface'

const IMAGE_PATH = import.meta.env.VITE_IMAGE_URL_LOCAL

const books = ref<Book[]>([])
const bookImages = ref<{ [key: number]: Image[] }>({})
const errorMessage = ref<string>('')

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

// TODO: trouver une solution pour les afficher les images

onMounted(() => {
  loadBooks()
})
</script>

<template>
  <div class="container">
    <h2>Tous les livres</h2>
    <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
    <ul class="book-list">
      <li v-for="book in books" :key="book.id" class="book-item">
        <RouterLink :to="{ name: 'BookDetail', params: { id: book.id } }" class="book-link">
          <img
            v-if="bookImages[book.id] && bookImages[book.id].length"
            :src="IMAGE_PATH + bookImages[book.id][0]"
            alt="Book cover"
            class="book-image"
          />
          <div class="book-info">
            <h3 class="book-title">{{ book.name }}</h3>
            <p class="book-author">{{ book.author.lastName }} {{ book.author.firstName }}</p>
          </div>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 20px;

  h2 {
    font-size: 2em;
    margin-bottom: 20px;
  }

  .book-list {
    list-style-type: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }

  .book-item {
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.05);
    }
  }

  .book-link {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }

  .book-info {
    text-align: center;
    margin-top: 10px;
  }

  .book-title {
    font-size: 1.2em;
    margin: 10px 0 5px;
  }

  .book-author {
    color: #6c757d;
  }
}
</style>
