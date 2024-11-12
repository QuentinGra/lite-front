<script setup lang="ts">
import { useHead } from '@unhead/vue'
import LegalNotice from '@/content/legal-notice.md'

useHead({
  title: 'Mentions légales - Lite',
  meta: [
    {
      name: 'description',
      content:
        'Mentions légales de Lite - Informations légales concernant notre site web et notre entreprise'
    }
  ]
})
</script>

<template>
  <section class="container-legal">
    <LegalNotice />
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
