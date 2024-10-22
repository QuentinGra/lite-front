<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { fetchCategoryById } from '@/api/admin/category.api'
import type { Category } from '@/interfaces/admin/category.interface'

const IMAGE_PATH = import.meta.env.VITE_IMAGE_URL_LOCAL

const router = useRouter()
const route = useRoute()
const category = ref<Category | null>(null)
const errorMessage = ref<string>('')

const loadCategory = async (): Promise<void> => {
  const categoryId: number = Number(route.params.id)
  try {
    const data: Category = await fetchCategoryById(categoryId)
    category.value = data

    console.log(category.value)
  } catch (error) {
    errorMessage.value = 'Impossible de charger la catégorie'
  }
}

onMounted((): void => {
  loadCategory()
})
</script>

<template>
  <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
</template>
