<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { LogOut, User } from 'lucide-vue-next'
import Logo from '@/assets/images/logo.svg'

const isMenuOpen = ref<boolean>(false)
const isDropdownOpen = ref<boolean>(false)
const { isUserDefined, logout, hasRole } = useAuth()

const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleDropdown = (): void => {
  isDropdownOpen.value = !isDropdownOpen.value
}
</script>

<template>
  <header>
    <nav class="navbar">
      <div class="navbar-brand">
        <img :src="Logo" alt="Logo" class="navbar-brand-logo" loading="lazy" />
      </div>
      <div :class="['navbar-burger', { 'is-active': isMenuOpen }]" @click="toggleMenu">
        <span></span>
      </div>
      <div :class="['navbar-menu', { 'is-active': isMenuOpen }]">
        <RouterLink v-if="!hasRole('ROLE_ADMIN')" to="/">Acceuil</RouterLink>
        <RouterLink v-if="!hasRole('ROLE_ADMIN')" to="/livres">Livres</RouterLink>
        <RouterLink v-if="!hasRole('ROLE_ADMIN')" to="/categories">Catégories</RouterLink>
        <div v-if="!isUserDefined" class="dropdown" :class="{ 'is-active': isDropdownOpen }">
          <button class="dropdown-trigger" @click="toggleDropdown">
            <User class="icon" :size="30" color="white" :stroke-width="2" />
          </button>
          <div class="dropdown-menu">
            <div class="dropdown-content">
              <RouterLink
                v-if="!hasRole('ROLE_ADMIN') && isUserDefined"
                to="/profile"
                class="dropdown-item"
                @click="toggleDropdown"
                >Profile</RouterLink
              >
              <RouterLink to="/connexion" class="dropdown-item" @click="toggleDropdown"
                >Connexion</RouterLink
              >
              <RouterLink to="/inscription" class="dropdown-item" @click="toggleDropdown"
                >Inscription</RouterLink
              >
            </div>
          </div>
        </div>
        <div v-if="!isUserDefined" class="mobile-menu">
          <RouterLink to="/connexion" class="mobile-item">Connexion</RouterLink>
          <RouterLink to="/inscription" class="mobile-item">Inscription</RouterLink>
        </div>
        <a v-if="isUserDefined" @click="logout">
          <LogOut class="icon" :size="16" :stroke-width="2.5" /> Déconnexion
        </a>
      </div>
    </nav>
  </header>
</template>
