<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { createZodPlugin } from '@formkit/zod'
import { authorSchema } from '@/schemas/admin/author.schema'
import { fetchAuthorById, updateAuthor } from '@/api/admin/author.api'
import type { Author } from '@/interfaces/admin/author.interface'

const router = useRouter()
const route = useRoute()
const errorMessage = ref<string>('')

const state = reactive<Partial<Author>>({
  id: 0,
  firstName: '',
  lastName: '',
  description: '',
  enable: false
})

const loadAuthor = async (): Promise<void> => {
  const authorId = Number(route.params.id)
  try {
    const data: Author = await fetchAuthorById(authorId)
    Object.assign(state, data)
  } catch (error) {
    errorMessage.value = "Impossible de charger l'auteur"
  }
}

const saveAuthor = async (): Promise<void> => {
  try {
    await updateAuthor(state.id!, state)
    router.push({ name: 'AdminAuthor' })
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Une erreur est survenue'
    }
  }
}

onMounted((): void => {
  loadAuthor()
})

const [zodPlugin, submitHandler] = createZodPlugin(authorSchema, saveAuthor)
</script>

<template>
  <div>
    <h1 class="title">Modification d'un auteur</h1>
    <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
    <FormKit type="form" submit-label="Enregistrer" :plugins="[zodPlugin]" @submit="submitHandler">
      <FormKit
        type="text"
        name="firstName"
        v-model="state.firstName"
        validation="required"
        validation-label="Le prénom de l'auteur"
        help="Veuillez entrer le prénom de l'auteur. Ce champ est obligatoire."
      />
      <FormKit
        type="text"
        name="lastName"
        v-model="state.lastName"
        validation="required"
        validation-label="Le nom de famille de l'auteur"
        help="Veuillez entrer le nom de famille de l'auteur. Ce champ est obligatoire."
      />
      <FormKit
        type="textarea"
        name="biography"
        v-model="state.description"
        help="Vous pouvez entrer une biographie pour l'auteur. Ce champ est optionnel."
      />
      <FormKit
        type="checkbox"
        name="enable"
        v-model="state.enable"
        help="Cochez cette case si l'auteur doit être actif."
      />
    </FormKit>
  </div>
</template>
