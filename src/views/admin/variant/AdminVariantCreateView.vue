<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { createZodPlugin } from '@formkit/zod'
import { bookVariantSchema } from '@/schemas/admin/bookVariant.schema'
import { createBookVariant } from '@/api/admin/variant.api'
import type { BookVariant } from '@/interfaces/admin/variant.interface'

const router = useRouter()
const errorMessage = ref<string>('')

const state = reactive<Partial<BookVariant>>({
  type: '',
  enable: false
})

const saveBookVariant = async (): Promise<void> => {
  try {
    await createBookVariant(state)
    router.push({ name: 'AdminBookVariant' })
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Une erreur est survenue'
    }
  }
}

const [zodPlugin, submitHandler] = createZodPlugin(bookVariantSchema, saveBookVariant)
</script>

<template>
  <div>
    <h1 class="title">Création d'une variante de livre</h1>
    <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
    <FormKit type="form" submit-label="Enregistrer" :plugins="[zodPlugin]" @submit="submitHandler">
      <FormKit
        type="select"
        name="type"
        v-model="state.type"
        validation="required"
        validation-label="Le type du variant"
        help="Veuillez sélectionner le type de la variante. Ce champ est obligatoire. Si vous voulez ajouter un nouveau type, veuillez contacter l'administrateur."
        :options="[
          { value: 'brocher', label: 'Broché' },
          { value: 'poche', label: 'Poche' },
          { value: 'relier', label: 'Relier' },
          { value: 'ebook', label: 'Livre électronique' }
        ]"
      />
      <FormKit
        type="checkbox"
        name="enable"
        v-model="state.enable"
        help="Cochez cette case si le variant doit être actif."
      />
    </FormKit>
  </div>
</template>
