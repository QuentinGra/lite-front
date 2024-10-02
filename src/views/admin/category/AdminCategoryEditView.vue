<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { createZodPlugin } from '@formkit/zod'
import { categorySchema } from '@/schemas/admin/category.schema'
import { fetchCategoryById, updateCategory } from '@/api/admin/category.api'
import type { Category } from '@/interfaces/admin/category.interface'

const router = useRouter()
const route = useRoute()

const state = reactive<Partial<Category>>({
  id: 0,
  name: '',
  description: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  enable: false
})

const loadCategory = async (): Promise<void> => {
  const categoryId = Number(route.params.id)
  try {
    const data: Category = await fetchCategoryById(categoryId)
    Object.assign(state, data)
  } catch (error) {
    console.error('Failed to fetch category:', error)
  }
}

const saveCategory = async (): Promise<void> => {
  try {
    await updateCategory(state.id!, state)
    router.push({ name: 'AdminCategory' })
  } catch (error) {
    console.error('Failed to save category:', error)
  }
}

onMounted((): void => {
  loadCategory()
})

const [zodPlugin, submitHandler] = createZodPlugin(categorySchema, saveCategory)
</script>

<template>
  <div>
    <h1>Edit Category</h1>
    <FormKit type="form" submit-label="Enregistrer" :plugins="[zodPlugin]" @submit="submitHandler">
      <FormKit
        type="text"
        name="name"
        validation="required"
        v-model="state.name"
        help="Veuillez entrer le nom de la catégorie. Ce champ est obligatoire."
      />
      <FormKit
        type="textarea"
        name="description"
        v-model="state.description"
        help="Vous pouvez entrer une description pour la catégorie. Ce champ est optionnel."
      />
      <FormKit
        type="checkbox"
        name="enable"
        v-model="state.enable"
        help="Cochez cette case si la catégorie doit être active."
      />
    </FormKit>
  </div>
</template>
