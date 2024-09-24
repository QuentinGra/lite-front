<script setup lang="ts">
import { ref } from 'vue'

const isSidebarOpen = ref(true)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="dashboard">
    <aside :class="{ sidebar: true, 'sidebar-closed': !isSidebarOpen }">
      <button @click="toggleSidebar">
        {{ isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar' }}
      </button>
      <nav v-if="isSidebarOpen">
        <ul>
          <li><router-link to="/link1">Link 1</router-link></li>
          <li><router-link to="/link2">Link 2</router-link></li>
          <li><router-link to="/link3">Link 3</router-link></li>
        </ul>
      </nav>
    </aside>
    <main class="content">
      <h1>Content</h1>
    </main>
  </div>
</template>
