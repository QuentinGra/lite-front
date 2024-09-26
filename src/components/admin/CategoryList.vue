<script setup lang="ts">
import { ref } from 'vue'
import CategoryItem from './CategoryItem.vue'

const categories = ref([
  { id: 1, name: 'Category 1' },
  { id: 2, name: 'Category 2' },
  { id: 3, name: 'Category 3' }
])

const editCategory = (id: number) => {
  // Logique pour éditer la catégorie
  console.log('Edit category with id:', id)
}

const deleteCategory = (id: number) => {
  categories.value = categories.value.filter((category) => category.id !== id)
}
</script>

<template>
  <ul>
    <CategoryItem
      v-for="category in categories"
      :key="category.id"
      :category="category"
      @edit="editCategory"
      @delete="deleteCategory"
    />
  </ul>
</template>
