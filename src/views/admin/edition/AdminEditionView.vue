<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import EditionList from '@/components/admin/EditionList.vue'
import { fetchEditions } from '@/api/admin/edition.api'
import type { Edition, EditionState } from '@/interfaces/admin/edition.interface'
import { Pencil } from 'lucide-vue-next'

const search = ref<string>('')
const errorMessage = ref<string>('')
const state = reactive<EditionState>({
  editions: []
})

const filteredEditions = computed<Edition[]>(() => {
  return state.editions.filter((edition: Edition) =>
    edition.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

const loadEditions = async (): Promise<void> => {
  try {
    const data: Edition[] = await fetchEditions()
    state.editions = data
  } catch (error) {
    errorMessage.value = "Imposible de charger les maisons d'éditions"
  }
}

const handleEditionDeleted = (id: number): void => {
  state.editions = state.editions.filter((edition: Edition) => edition.id !== id)
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
      <router-link to="/admin-panel/edition/creer" class="button-create">
        <Pencil class="icon" :size="16" :stroke-width="2.5" /> Créer
      </router-link>
    </div>
    <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
    <EditionList :editions="filteredEditions" @edition-deleted="handleEditionDeleted" />
  </div>
</template>
