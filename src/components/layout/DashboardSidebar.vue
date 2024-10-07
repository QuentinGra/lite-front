<script setup lang="ts">
import { ref } from 'vue'
import { X, ArrowRightFromLine } from 'lucide-vue-next'

const isSidebarOpen = ref<boolean>(true)

const toggleSidebar = (): void => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <aside :class="{ sidebar: true, 'sidebar-closed': !isSidebarOpen }">
    <button @click="toggleSidebar">
      <X v-if="isSidebarOpen" />
      <ArrowRightFromLine v-else />
    </button>
    <nav v-if="isSidebarOpen">
      <ul>
        <li><router-link to="/admin-panel/livres">Livres</router-link></li>
        <li><router-link to="/admin-panel/categories">Catégories</router-link></li>
        <li><router-link to="/admin-panel/editions">Editions</router-link></li>
        <li><router-link to="/admin-panel/auteurs">Auteurs</router-link></li>
        <li><router-link to="/admin-panel/variants">Variants</router-link></li>
        <li><router-link to="/admin-panel/utilisateurs">Utilisateurs</router-link></li>
      </ul>
    </nav>
  </aside>
</template>
