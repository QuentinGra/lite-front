<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import EditionList from '@/components/admin/EditionList.vue'
import { fetchEditions } from '@/api/admin/edition.api'
import type { Edition } from '@/interfaces/admin/edition.interface'

const search = ref<string>('')
const errorMessage = ref<string>('')
const editions = ref<Edition[]>([])

const filteredEditions = computed<Edition[]>(() => {
  return editions.value.filter((edition: Edition) =>
    edition.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

const loadEditions = async (): Promise<void> => {
  try {
    const data: Edition[] = await fetchEditions()
    editions.value = data
  } catch (error) {
    errorMessage.value = "Imposible de charger les maisons d'éditions"
  }
}

const handleEditionDeleted = (id: number): void => {
  editions.value = editions.value.filter((edition: Edition) => edition.id !== id)
}

onMounted((): void => {
  loadEditions()
})
</script>

<template>
  <div>
    <h1 class="title">Liste des maisons d'éditions</h1>
    <label for="search-input" class="search-label">Rechercher une maison d'édition</label>
    <div class="button-container">
      <input type="text" v-model="search" placeholder="Nom" class="search-input" />
      <router-link to="/admin-panel/edition/creer" class="button-create">Créer</router-link>
    </div>
    <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
    <EditionList :editions="filteredEditions" @edition-deleted="handleEditionDeleted" />
  </div>
</template>
