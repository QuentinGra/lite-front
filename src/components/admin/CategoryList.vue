<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// onMounted(() => {
//   // TODO: Fetch category data
// })

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
  <table class="table-admin">
    <thead>
      <tr>
        <th>Nom</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="category in categories" :key="category.id">
        <td>{{ category.name }}</td>
        <td>
          <button @click="editCategory(category.id)" class="button-edit">Edit</button>
          <button @click="deleteCategory(category.id)" class="button-delete">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
