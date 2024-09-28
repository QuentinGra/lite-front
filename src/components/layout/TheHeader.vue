<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const isMenuOpen = ref(false)
const { isUserDefined, logout, hasRole } = useAuth()

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
        <RouterLink v-if="!hasRole('ROLE_ADMIN')" to="/">Acceuil</RouterLink>
        <RouterLink v-if="!isUserDefined" to="/connexion">Connexion</RouterLink>
        <RouterLink v-if="!isUserDefined" to="/inscription">Inscription</RouterLink>
        <a v-if="isUserDefined" @click="logout">Déconnexion</a>
      </div>
    </nav>
  </header>
</template>
