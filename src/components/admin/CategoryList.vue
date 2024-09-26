<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CategoryItem from '@/components/admin/CategoryItem.vue'

const router = useRouter()

const categories = ref([
  { id: 1, name: 'Category 1' },
  { id: 2, name: 'Category 2' },
  { id: 3, name: 'Category 3' }
])

const editCategory = (id: number): void => {
  router.push({ name: 'AdminCategoryEdit', params: { id } })
}

const deleteCategory = (id: number): void => {
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
