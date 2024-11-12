<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import TheHeader from '@/components/layout/TheHeader.vue'
import CookieBanner from '@/components/common/CookieBanner.vue'
import TheFooter from '@/components/layout/TheFooter.vue'

const { checkAuth } = useAuth()

onMounted(async (): Promise<void> => {
  await checkAuth()
})
</script>

<template>
  <TheHeader />
  <main>
    <RouterView />
    <CookieBanner />
  </main>
  <TheFooter />
</template>
