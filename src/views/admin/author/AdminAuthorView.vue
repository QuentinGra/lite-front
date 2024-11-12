<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import AuthorList from '@/components/admin/AuthorList.vue'
import { fetchAuthors } from '@/api/admin/author.api'
import type { Author, AuthorState } from '@/interfaces/admin/author.interface'
import { Pencil } from 'lucide-vue-next'

const search = ref<string>('')
const errorMessage = ref<string>('')
const state = reactive<AuthorState>({
  authors: []
})

const filteredAuthors = computed<Author[]>(() => {
  return state.authors.filter((author: Author) =>
    author.lastName.toLowerCase().includes(search.value.toLowerCase())
  )
})

const loadAuthors = async (): Promise<void> => {
  try {
    const data: Author[] = await fetchAuthors()
    state.authors = data
  } catch (error) {
    errorMessage.value = 'Imposible de charger les auteurs'
  }
}

const handleAuthorDeleted = (id: number): void => {
  state.authors = state.authors.filter((author: Author) => author.id !== id)
}

onMounted((): void => {
  loadAuthors()
})
</script>

<template>
  <div>
    <h1 class="title">Liste des auteurs</h1>
    <label for="search-input" class="search-label">Rechercher un auteur</label>
    <div class="button-container">
      <input type="text" v-model="search" placeholder="Nom de famille" class="search-input" />
      <router-link to="/admin-panel/auteur/creer" class="button-create">
        <Pencil class="icon" :size="16" :stroke-width="2.5" /> Créer
      </router-link>
    </div>
    <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
    <AuthorList :authors="filteredAuthors" @author-deleted="handleAuthorDeleted" />
  </div>
</template>
