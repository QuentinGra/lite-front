<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { createZodPlugin } from '@formkit/zod'
import { bookVariantSchema } from '@/schemas/admin/bookVariant.schema'
import { fetchBookVariantById, updateBookVariant } from '@/api/admin/variant.api'
import type { BookVariant } from '@/interfaces/admin/variant.interface'

const router = useRouter()
const route = useRoute()
const errorMessage = ref<string>('')

const state = reactive<Partial<BookVariant>>({
  id: 0,
  type: '',
  enable: false
})

const loadBookVariant = async (): Promise<void> => {
  const bookVariantId = Number(route.params.id)
  try {
    const data: BookVariant = await fetchBookVariantById(bookVariantId)
    Object.assign(state, data)
  } catch (error) {
    console.error('Failed to fetch book variant:', error)
  }
}

const saveBookVariant = async (): Promise<void> => {
  try {
    await updateBookVariant(state.id!, state)
    router.push({ name: 'AdminBookVariant' })
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Une erreur est survenue'
    }
  }
}

onMounted((): void => {
  loadBookVariant()
})

const [zodPlugin, submitHandler] = createZodPlugin(bookVariantSchema, saveBookVariant)
</script>

<template>
  <div>
    <h1 class="title">Modification d'une variante de livre</h1>
    <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
    <FormKit type="form" submit-label="Enregistrer" :plugins="[zodPlugin]" @submit="submitHandler">
      <FormKit
        type="select"
        name="type"
        v-model="state.type"
        validation="required"
        validation-label="Le type de la variante"
        help="Veuillez sélectionner le type de la variante. Ce champ est obligatoire."
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
        help="Cochez cette case si la variante doit être active."
      />
    </FormKit>
  </div>
</template>
