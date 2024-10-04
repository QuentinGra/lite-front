<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import BookVariantList from '@/components/admin/VariantList.vue'
import { fetchBookVariants } from '@/api/admin/variant.api'
import type { BookVariant, VariantState } from '@/interfaces/admin/variant.interface'

const search = ref<string>('')
const errorMessage = ref<string>('')
const state = reactive<VariantState>({
  variants: []
})

const filteredBookVariants = computed<BookVariant[]>(() => {
  return state.variants.filter((variant: BookVariant) =>
    variant.type.toLowerCase().includes(search.value.toLowerCase())
  )
})

const loadBookVariants = async (): Promise<void> => {
  try {
    const data: BookVariant[] = await fetchBookVariants()
    state.variants = data
  } catch (error) {
    errorMessage.value = 'Impossible de charger les variants de livre'
  }
}

const handleBookVariantDeleted = (id: number): void => {
  state.variants = state.variants.filter((variant: BookVariant) => variant.id !== id)
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
      <router-link to="/admin-panel/variant/creer" class="button-create">Créer</router-link>
    </div>
    <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
    <BookVariantList
      :book-variants="filteredBookVariants"
      @book-variant-deleted="handleBookVariantDeleted"
    />
  </div>
</template>
