<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { createZodPlugin } from '@formkit/zod'
import { authorSchema } from '@/schemas/admin/author.schema'
import { createAuthor } from '@/api/admin/author.api'
import type { AuthorCreate } from '@/interfaces/admin/author.interface'

const router = useRouter()
const errorMessage = ref<string>('')

const state = reactive<Partial<AuthorCreate>>({
  firstName: '',
  lastName: '',
  description: '',
  enable: false,
  image: undefined
})
const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    const file = input.files[0]
    state.image = file
  }
}

const saveAuthor = async (): Promise<void> => {
  try {
    const { image, ...authorData } = state
    await createAuthor(authorData, image)
    router.push({ name: 'AdminAuthor' })
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Une erreur est survenue'
    }
  }
}

const [zodPlugin, submitHandler] = createZodPlugin(authorSchema, saveAuthor)
</script>

<template>
  <div>
    <h1 class="title">Création d'un auteur</h1>
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
      <div class="form-file">
        <input type="file" name="image" @change="handleFileChange" accept=".jpg,.jpeg,.png,.webp" />
      </div>
    </FormKit>
  </div>
</template>
