<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CategoryList from '@/components/admin/CategoryList.vue'
import { fetchCategories } from '@/api/admin/category.api'
import type { Category } from '@/interfaces/admin/category.interface'

const search = ref<string>('')
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
    console.error('Failed to fetch categories:', error)
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
    <h1>Liste des catégories</h1>
    <label for="search-input" class="search-label">Rechercher une catégorie</label>
    <div class="button-container">
      <input type="text" v-model="search" placeholder="Nom" class="search-input" />
      <router-link to="/admin-panel/categorie/creer" class="button-create">Créer</router-link>
    </div>
    <CategoryList :categories="filteredCategories" @category-deleted="handleCategoryDeleted" />
  </div>
</template>
