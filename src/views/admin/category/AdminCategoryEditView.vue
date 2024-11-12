<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { createZodPlugin } from '@formkit/zod'
import { categorySchema } from '@/schemas/admin/category.schema'
import { fetchCategoryById, updateCategory } from '@/api/admin/category.api'
import type { Category } from '@/interfaces/admin/category.interface'

const router = useRouter()
const route = useRoute()
const errorMessage = ref<string>('')

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
    errorMessage.value = 'Impossible de charger les catégories'
  }
}

const saveCategory = async (): Promise<void> => {
  try {
    await updateCategory(state.id!, state)
    router.push({ name: 'AdminCategory' })
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Une erreur est survenue'
    }
  }
}

onMounted((): void => {
  loadCategory()
})

const [zodPlugin, submitHandler] = createZodPlugin(categorySchema, saveCategory)
</script>

<template>
  <div>
    <h1 class="title">Modification d'une catégorie</h1>
    <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
    <FormKit type="form" submit-label="Enregistrer" :plugins="[zodPlugin]" @submit="submitHandler">
      <FormKit
        type="text"
        name="name"
        validation="required"
        validation-label="Le nom de la catégorie"
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
