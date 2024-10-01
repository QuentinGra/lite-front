<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchCategories, deleteCategoryById } from '@/api/admin/category/category.api'
import type { Category } from '@/interfaces/admin/category.interface'

const router = useRouter()

const state = reactive({
  categories: [] as Category[]
})

const loadCategories = async () => {
  try {
    const data = await fetchCategories()
    state.categories = data
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  }
}

onMounted(() => {
  loadCategories()
})

const editCategory = (id: number): void => {
  router.push({ name: 'AdminCategoryEdit', params: { id } })
}

const deleteCategory = async (id: number): Promise<void> => {
  try {
    await deleteCategoryById(id)
    state.categories = state.categories.filter((category) => category.id !== id)
  } catch (error) {
    console.error('Failed to delete category:', error)
  }
}
</script>

<template>
  <table class="table-admin">
    <thead>
      <tr>
        <th>Nom</th>
        <th>Actif</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="category in state.categories" :key="category.id">
        <td>{{ category.name }}</td>
        <td>{{ category.enable ? 'Actif' : 'Inactif' }}</td>
        <td>
          <button @click="editCategory(category.id)" class="button-edit">Edit</button>
          <button @click="deleteCategory(category.id)" class="button-delete">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
