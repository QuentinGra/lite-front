<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const saveCategory = () => {
  router.push({ name: 'AdminCategory' })
}
</script>

<template>
  <div>
    <h1>Créer une nouvelle catégorie</h1>
    <button @click="saveCategory">Sauvegarder</button>
  </div>
</template>
