<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BookVariantList from '@/components/admin/VariantList.vue'
import { fetchBookVariants } from '@/api/admin/variant.api'
import type { BookVariant } from '@/interfaces/admin/variant.interface'

const search = ref<string>('')
const bookVariants = ref<BookVariant[]>([])
const filteredBookVariants = computed<BookVariant[]>(() => {
  return bookVariants.value.filter((variant: BookVariant) =>
    variant.type.toLowerCase().includes(search.value.toLowerCase())
  )
})

const loadBookVariants = async (): Promise<void> => {
  try {
    const data: BookVariant[] = await fetchBookVariants()
    bookVariants.value = data
  } catch (error) {
    console.error('Failed to fetch book variants:', error)
  }
}

const handleBookVariantDeleted = (id: number): void => {
  bookVariants.value = bookVariants.value.filter((variant: BookVariant) => variant.id !== id)
}

onMounted((): void => {
  loadBookVariants()
})
</script>

<template>
  <div>
    <h1 class="title">Liste des variantes de livres</h1>
    <label for="search-input" class="search-label">Rechercher une variante</label>
    <div class="button-container">
      <input type="text" v-model="search" placeholder="Type" class="search-input" />
      <router-link to="/admin-panel/book-variant/creer" class="button-create">Créer</router-link>
    </div>
    <BookVariantList
      :book-variants="filteredBookVariants"
      @book-variant-deleted="handleBookVariantDeleted"
    />
  </div>
</template>
