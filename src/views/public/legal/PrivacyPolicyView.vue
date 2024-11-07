<script setup lang="ts">
import { useHead } from '@unhead/vue'
import PrivacyPolicy from '@/content/privacy-policy.md'

useHead({
  title: 'Politique de confidentialité - Lite',
  meta: [
    {
      name: 'description',
      content:
        'Politique de confidentialité de Lite - Découvrez comment nous protégeons vos données personnelles'
    }
  ]
})
</script>

<template>
  <section class="container-legal">
    <PrivacyPolicy />
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
