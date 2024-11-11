<script setup lang="ts">
import ProfilSidebar from '@/components/layout/ProfilSidebar.vue'
</script>

<template>
  <div class="profil">
    <ProfilSidebar />
    <section class="content">
      <RouterView />
    </section>
  </div>
</template>
