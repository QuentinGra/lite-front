<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const category = ref({ name: '' })

const saveCategory = () => {
  // Logique pour sauvegarder la nouvelle catégorie
  console.log('New category saved:', category.value)
  router.push({ name: 'AdminCategory' })
}
</script>

<template>
  <div>
    <h1>Créer une nouvelle catégorie</h1>
    <input v-model="category.name" placeholder="Nom de la catégorie" />
    <button @click="saveCategory">Sauvegarder</button>
  </div>
</template>
