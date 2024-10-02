<script setup lang="ts">
import { ref } from 'vue'

const isSidebarOpen = ref<boolean>(true)

const toggleSidebar = (): void => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <aside :class="{ sidebar: true, 'sidebar-closed': !isSidebarOpen }">
    <button @click="toggleSidebar">
      {{ isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar' }}
    </button>
    <nav v-if="isSidebarOpen">
      <ul>
        <li><router-link to="/admin-panel">Dashboard</router-link></li>
        <li><router-link to="/admin-panel/categories">Categories</router-link></li>
        <li><router-link to="/admin-panel/editions">Editions</router-link></li>
      </ul>
    </nav>
  </aside>
</template>
