<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CategoryList from '@/components/admin/CategoryList.vue'
import { fetchCategories } from '@/api/admin/category/category.api'
import type { Category } from '@/interfaces/admin/category.interface'

const search = ref('')
const categories = ref<Category[]>([])
const filteredCategories = computed(() => {
  return categories.value.filter((category) =>
    category.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

const loadCategories = async () => {
  try {
    const data = await fetchCategories()
    categories.value = data
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  }
}

const handleCategoryDeleted = (id: number) => {
  categories.value = categories.value.filter((category) => category.id !== id)
}

onMounted(() => {
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
