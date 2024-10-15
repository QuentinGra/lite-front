<script setup lang="ts">
import DashboardSidebar from '@/components/layout/DashboardSidebar.vue'
</script>

<template>
  <div class="dashboard">
    <DashboardSidebar />
    <section class="content">
      <RouterView />
    </section>
  </div>
</template>
