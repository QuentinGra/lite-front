<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ImageList from '@/components/admin/ImageList.vue'
import { fetchImagesByBookId } from '@/api/admin/image.api'
import type { Image } from '@/interfaces/admin/image.interface'
import { Pencil } from 'lucide-vue-next'

const route = useRoute()
const errorMessage = ref<string>('')

const state = reactive<{
  images: Image[]
}>({
  images: []
})

const loadImages = async (): Promise<void> => {
  const bookId: number = Number(route.params.id)
  try {
    const data: Image[] = await fetchImagesByBookId(bookId)
    state.images = data
  } catch (error) {
    const errorMsg = (error as Error).message
    if (errorMsg === 'Image not found') {
      errorMessage.value = 'Aucune image trouvée'
    } else {
      errorMessage.value = 'Impossible de charger les images'
    }
  }
}

const handleImageDeleted = (id: number): void => {
  state.images = state.images.filter((image: Image) => image.id !== id)
}

onMounted((): void => {
  loadImages()
})
</script>

<template>
  <div>
    <h1 class="title">Liste des images</h1>
    <div class="button-container">
      <router-link
        :to="{ name: 'AdminBookImageCreate', params: { id: route.params.id } }"
        class="button-create"
      >
        <Pencil class="icon" :size="16" :stroke-width="2.5" /> Créer
      </router-link>
    </div>
    <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
    <ImageList :images="state.images" @image-deleted="handleImageDeleted" />
  </div>
</template>
