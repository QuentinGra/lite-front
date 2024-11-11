<script setup lang="ts">
import { useHead } from '@unhead/vue'
import CookiePolicy from '@/content/cookies-policy.md'

useHead({
  title: 'Politique des cookies - Lite',
  meta: [
    {
      name: 'description',
      content:
        'Politique des cookies de Lite - Découvrez comment nous utilisons les cookies pour améliorer votre expérience'
    }
  ]
})
</script>

<template>
  <section class="container-legal">
    <CookiePolicy />
  </section>
</template>

<style lang="scss" scoped>
/* Styles pour le contenu markdown */
:deep(h1) {
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

:deep(h2) {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

:deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}
</style>
