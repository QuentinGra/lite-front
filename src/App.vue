<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import TheHeader from '@/components/layout/TheHeader.vue'

const { checkAuth } = useAuth()

onMounted(async (): Promise<void> => {
  await checkAuth()
})
</script>

<template>
  <TheHeader />
  <main>
    <RouterView />
  </main>
</template>
