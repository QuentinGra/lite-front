<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import TheHeader from '@/components/TheHeader.vue'

const { checkAuth } = useAuth()

onMounted(async () => {
  await checkAuth()
})
</script>

<template>
  <main>
    <TheHeader />
    <RouterView />
  </main>
</template>
