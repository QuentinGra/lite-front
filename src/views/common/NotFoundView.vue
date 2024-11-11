<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
</script>

<template>
  <section class="not-found-container">
    <div class="not-found-content">
      <h1>Not Found</h1>
      <p>Oups, une erreur s'est produite. La page que vous cherchez n'existe pas.</p>
      <RouterLink to="/">
        <ArrowLeft :size="20" />
        Retour à l'accueil
      </RouterLink>
    </div>
  </section>
</template>
