<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import BookList from '@/components/admin/BookList.vue'
import { fetchBooks } from '@/api/admin/book.api'
import type { Book, BookState } from '@/interfaces/admin/book.interface'
import { Pencil } from 'lucide-vue-next'

const search = ref<string>('')
const errorMessage = ref<string>('')
const state = reactive<BookState>({
  books: []
})

const filteredBooks = computed<Book[]>(() => {
  return state.books.filter((book: Book) =>
    book.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

const loadBooks = async (): Promise<void> => {
  try {
    const data: Book[] = await fetchBooks()
    state.books = data
  } catch (error) {
    errorMessage.value = 'Impossible de charger les livres'
  }
}

const handleBookDeleted = (id: number): void => {
  state.books = state.books.filter((book: Book) => book.id !== id)
}

onMounted((): void => {
  loadBooks()
})
</script>

<template>
  <div>
    <h1 class="title">Liste des livres</h1>
    <label for="search-input" class="search-label">Rechercher un livre</label>
    <div class="button-container">
      <input type="text" v-model="search" placeholder="Titre" class="search-input" />
      <router-link to="/admin-panel/book/creer" class="button-create">
        <Pencil class="icon" :size="16" :stroke-width="2.5" /> Créer
      </router-link>
    </div>
    <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
    <BookList :books="filteredBooks" @book-deleted="handleBookDeleted" />
  </div>
</template>
