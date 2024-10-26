<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { fetchAuthorById } from '@/api/admin/author.api'
import type { Author } from '@/interfaces/admin/author.interface'

const IMAGE_PATH = import.meta.env.VITE_IMAGE_URL_LOCAL

const route = useRoute()
const author = ref<Author | null>(null)
const errorMessage = ref<string>('')

const loadAuthor = async (): Promise<void> => {
  const authorId: number = Number(route.params.id)
  try {
    const data: Author = await fetchAuthorById(authorId)
    author.value = data
  } catch (error) {
    errorMessage.value = "Impossible de charger l'auteur"
  }
}

onMounted((): void => {
  loadAuthor()
})
</script>

<template>
  <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
  <div v-if="author" class="author-detail">
    <div class="author-detail-left">
      <img :src="IMAGE_PATH + author.imageName" alt="Author image" class="author-image" />
    </div>
    <div class="author-detail-right">
      <h1 class="author-detail-title">{{ author.lastName }} {{ author.firstName }}</h1>
      <p class="author-detail-description">{{ author.description }}</p>
    </div>
  </div>
</template>
