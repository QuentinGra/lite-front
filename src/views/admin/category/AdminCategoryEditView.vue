<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const categoryId = route.params.id
const category = ref({ id: categoryId, name: '' })

onMounted(() => {
  // Fetch category data based on categoryId
  // For now, we'll just simulate it
  category.value.name = `Category ${categoryId}`
})

const saveCategory = () => {
  // Save category logic
  console.log('Category saved:', category.value)
}
</script>

<template>
  <div>
    <h1>Edit Category</h1>
    <input v-model="category.name" />
    <button @click="saveCategory">Save</button>
  </div>
</template>
