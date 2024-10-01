<script setup lang="ts">
import { ref } from 'vue'
import CategoryList from '@/components/admin/CategoryList.vue'

const search = ref('')
</script>

<template>
  <div>
    <h1>Liste des catégories</h1>
    <label for="search-input" class="search-label">Rechercher une catégorie</label>
    <div class="button-container">
      <input type="text" v-model="search" placeholder="Nom" class="search-input" />
      <router-link to="/admin-panel/categorie/creer" class="button-create">Créer</router-link>
    </div>
    <CategoryList />
  </div>
</template>
