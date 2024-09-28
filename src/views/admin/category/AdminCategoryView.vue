<script setup lang="ts">
import CategoryList from '@/components/admin/CategoryList.vue'
</script>

<template>
  <div>
    <h1>Liste des catégories</h1>
    <div class="button-container">
      <router-link to="/admin-panel/categorie/creer" class="button-create">Créer</router-link>
    </div>
    <CategoryList />
  </div>
</template>
