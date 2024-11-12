<script setup lang="ts">
import { ref } from 'vue'
import { X, ArrowRightFromLine, Book, List, BookOpen, User, Layers, Users } from 'lucide-vue-next'

const isSidebarOpen = ref<boolean>(true)

const toggleSidebar = (): void => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <aside :class="{ sidebar: true, 'sidebar-closed': !isSidebarOpen }">
    <button @click="toggleSidebar">
      <X :stroke-width="2.5" v-if="isSidebarOpen" />
      <ArrowRightFromLine :stroke-width="2.5" v-else />
    </button>
    <nav v-if="isSidebarOpen">
      <ul>
        <li>
          <router-link to="/admin-panel/livres">
            <Book class="icon" :size="16" :stroke-width="2.5" /> Livres
          </router-link>
        </li>
        <li>
          <router-link to="/admin-panel/categories">
            <List class="icon" :size="16" :stroke-width="2.5" /> Catégories</router-link
          >
        </li>
        <li>
          <router-link to="/admin-panel/editions">
            <BookOpen class="icon" :size="16" :stroke-width="2.5" /> Editions</router-link
          >
        </li>
        <li>
          <router-link to="/admin-panel/auteurs">
            <User class="icon" :size="16" :stroke-width="2.5" /> Auteurs</router-link
          >
        </li>
        <li>
          <router-link to="/admin-panel/variants">
            <Layers class="icon" :size="16" :stroke-width="2.5" /> Variants</router-link
          >
        </li>
        <li>
          <router-link to="/admin-panel/utilisateurs">
            <Users class="icon" :size="16" :stroke-width="2.5" /> Utilisateurs</router-link
          >
        </li>
      </ul>
    </nav>
  </aside>
</template>
