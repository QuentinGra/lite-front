<script setup lang="ts">
import { useRouter } from 'vue-router'
import CategoryList from '@/components/admin/CategoryList.vue'

const router = useRouter()

const editCategory = (id: number) => {
  router.push({ name: 'AdminCategoryEdit', params: { id } })
}

const deleteCategory = (id: number) => {
  // Logique pour supprimer la catégorie
  console.log('Delete category with id:', id)
}
</script>

<template>
  <div>
    <h1>Categories</h1>
    <CategoryList @edit="editCategory" @delete="deleteCategory" />
  </div>
</template>
