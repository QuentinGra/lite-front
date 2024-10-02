<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { createZodPlugin } from '@formkit/zod'
import { editionSchema } from '@/schemas/admin/edition.schema'
import { createEdition } from '@/api/admin/edition.api'
import type { Edition } from '@/interfaces/admin/edition.interface'

const router = useRouter()
const errorMessage = ref<string>('')

const state = reactive<Partial<Edition>>({
  name: '',
  description: '',
  enable: false
})

const saveEdition = async (): Promise<void> => {
  try {
    await createEdition(state)
    router.push({ name: 'AdminEdition' })
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Une erreur est survenue'
    }
  }
}

const [zodPlugin, submitHandler] = createZodPlugin(editionSchema, saveEdition)
</script>

<template>
  <div>
    <h1 class="title">Création d'un maison d'édition</h1>
    <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
    <FormKit type="form" submit-label="Enregistrer" :plugins="[zodPlugin]" @submit="submitHandler">
      <FormKit
        type="text"
        name="name"
        v-model="state.name"
        validation="required"
        validation-label="Le nom de la maison d'édition"
        help="Veuillez entrer le nom de l'édition. Ce champ est obligatoire."
      />
      <FormKit
        type="textarea"
        name="description"
        v-model="state.description"
        help="Vous pouvez entrer une description pour l'édition. Ce champ est optionnel."
      />
      <FormKit
        type="checkbox"
        name="enable"
        v-model="state.enable"
        help="Cochez cette case si l'édition doit être active."
      />
    </FormKit>
  </div>
</template>
