<script setup lang="ts">
import { useRouter } from 'vue-router'
import { deleteCategoryById } from '@/api/admin/category.api'
import type { Category } from '@/interfaces/admin/category.interface'
import { Edit, Trash } from 'lucide-vue-next'

const router = useRouter()

const props = defineProps<{
  categories: Category[]
}>()

const emit = defineEmits<{
  (e: 'categoryDeleted', id: number): void
}>()

const editCategory = (id: number): void => {
  router.push({ name: 'AdminCategoryEdit', params: { id } })
}

const deleteCategory = async (id: number): Promise<void> => {
  try {
    await deleteCategoryById(id)
    emit('categoryDeleted', id)
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
      <tr v-for="category in props.categories" :key="category.id">
        <td>{{ category.name }}</td>
        <td>{{ category.enable ? 'Actif' : 'Inactif' }}</td>
        <td>
          <button @click="editCategory(category.id)" class="button-edit">
            <Edit class="icon" :size="16" :stroke-width="2.5" /> Modifier
          </button>
          <button @click="deleteCategory(category.id)" class="button-delete">
            <Trash class="icon" :size="16" :stroke-width="2.5" /> Supprimer
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
