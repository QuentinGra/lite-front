<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const isMenuOpen = ref(false)
const authStore = useAuthStore()

const isConnected = computed(() => authStore.isUserDefined)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header>
    <nav class="navbar">
      <div class="navbar-brand">
        <a href="#">LOGO</a>
      </div>
      <div :class="['navbar-burger', { 'is-active': isMenuOpen }]" @click="toggleMenu">
        <span></span>
      </div>
      <div :class="['navbar-menu', { 'is-active': isMenuOpen }]">
        <RouterLink to="/">Acceuil</RouterLink>
        <RouterLink v-if="!isConnected" to="/connexion">Connexion</RouterLink>
        <RouterLink v-if="!isConnected" to="/inscription">Inscription</RouterLink>
      </div>
    </nav>
  </header>
</template>
