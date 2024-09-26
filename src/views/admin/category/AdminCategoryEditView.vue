<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // TODO: Fetch category data based on categoryId
})

const saveCategory = () => {
  router.push({ name: 'AdminCategory' })
}
</script>

<template>
  <div>
    <h1>Edit Category</h1>
    <button @click="saveCategory">Save</button>
  </div>
</template>
