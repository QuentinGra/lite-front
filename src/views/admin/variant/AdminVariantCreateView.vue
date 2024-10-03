<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createZodPlugin } from '@formkit/zod'
import { bookVariantSchema } from '@/schemas/admin/bookVariant.schema'
import { fetchBookVariants, createBookVariant } from '@/api/admin/variant.api'
import type { BookVariant } from '@/interfaces/admin/variant.interface'

const router = useRouter()
const errorMessage = ref<string>('')

const state = reactive<Partial<BookVariant>>({
  type: '',
  enable: false
})

const existingVariants = ref<BookVariant[]>([])
const options = ref([
  { value: 'brocher', label: 'Broché' },
  { value: 'poche', label: 'Poche' },
  { value: 'relier', label: 'Relier' },
  { value: 'ebook', label: 'Livre électronique' }
])

const loadExistingVariants = async (): Promise<void> => {
  try {
    const data: BookVariant[] = await fetchBookVariants()
    existingVariants.value = data
    filterOptions()
  } catch (error) {
    errorMessage.value = 'Impossible de charger les variants de livre'
  }
}

const filterOptions = (): void => {
  const existingTypes = existingVariants.value.map((variant) => variant.type)
  options.value = options.value.filter((option) => !existingTypes.includes(option.value))
}

const saveBookVariant = async (): Promise<void> => {
  try {
    await createBookVariant(state)
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
  loadExistingVariants()
})

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
        help="Si le type de variant ne figure pas dans la liste ou que la liste est vide c'est que tous les types de variant ont déjà été créés."
        :options="options"
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
