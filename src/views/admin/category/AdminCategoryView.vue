<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CategoryList from '@/components/admin/CategoryList.vue'
import { fetchCategories } from '@/api/admin/category.api'
import type { Category } from '@/interfaces/admin/category.interface'

const search = ref<string>('')
const errorMessage = ref<string>('')
const categories = ref<Category[]>([])

const filteredCategories = computed<Category[]>(() => {
  return categories.value.filter((category: Category) =>
    category.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

const loadCategories = async (): Promise<void> => {
  try {
    const data: Category[] = await fetchCategories()
    categories.value = data
  } catch (error) {
    errorMessage.value = 'Impossible de charger les catégories'
  }
}

const handleCategoryDeleted = (id: number): void => {
  categories.value = categories.value.filter((category: Category) => category.id !== id)
}

onMounted((): void => {
  loadCategories()
})
</script>

<template>
  <div>
    <h1 class="title">Liste des catégories</h1>
    <label for="search-input" class="search-label">Rechercher une catégorie</label>
    <div class="button-container">
      <input type="text" v-model="search" placeholder="Nom" class="search-input" />
      <router-link to="/admin-panel/categorie/creer" class="button-create">Créer</router-link>
    </div>
    <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
    <CategoryList :categories="filteredCategories" @category-deleted="handleCategoryDeleted" />
  </div>
</template>
