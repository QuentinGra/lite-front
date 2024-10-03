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
    errorMessage.value = 'Impossible de charger les variants de livre'
  }
}

const saveBookVariant = async (): Promise<void> => {
  try {
    await updateBookVariant(state.id!, state)
    router.push({ name: 'AdminVariant' })
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
      <div>
        <p class="variant-type"><b>Type du variant:</b> {{ state.type }}</p>
      </div>
      <FormKit
        type="checkbox"
        name="enable"
        v-model="state.enable"
        help="Cochez cette case si la variante doit être active."
      />
    </FormKit>
  </div>
</template>
