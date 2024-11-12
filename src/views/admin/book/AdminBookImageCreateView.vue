<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { createZodPlugin } from '@formkit/zod'
import { fetchBookById } from '@/api/admin/book.api'
import { imageSchema } from '@/schemas/admin/image.schema'
import { createImage } from '@/api/admin/image.api'
import type { Book } from '@/interfaces/admin/book.interface'
import type { ImageCreate } from '@/interfaces/admin/image.interface'

const router = useRouter()
const route = useRoute()
const errorMessage = ref<string>('')
const book = ref<Book | null>(null)

const state = reactive<ImageCreate>({
  image: null,
  book: Number(route.params.id),
  enable: false
})

const loadBook = async (): Promise<void> => {
  try {
    const data: Book = await fetchBookById(state.book)
    book.value = data
  } catch (error) {
    errorMessage.value = 'Impossible de charger les données du livre'
  }
}

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    state.image = file
  }
}

const saveImage = async (): Promise<void> => {
  try {
    await createImage(state)
    router.push({ name: 'AdminBook' })
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Une erreur est survenue'
  }
}

onMounted((): void => {
  loadBook()
})

const [zodPlugin, submitHandler] = createZodPlugin(imageSchema, saveImage)
</script>

<template>
  <div>
    <h1 class="title">Ajout d'une image pour le livre {{ book ? book.name : '' }}</h1>
    <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
    <FormKit type="form" submit-label="Enregistrer" :plugins="[zodPlugin]" @submit="submitHandler">
      <div class="form-file">
        <input type="file" name="image" @change="handleFileChange" accept=".jpg,.jpeg,.png,.webp" />
      </div>
      <FormKit
        type="checkbox"
        name="enable"
        v-model="state.enable"
        help="Cochez cette case si l'image doit être active."
      />
    </FormKit>
  </div>
</template>
