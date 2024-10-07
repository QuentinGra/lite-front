<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { LogOut, User } from 'lucide-vue-next'

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
        <a href="#">LOGO</a>
      </div>
      <div :class="['navbar-burger', { 'is-active': isMenuOpen }]" @click="toggleMenu">
        <span></span>
      </div>
      <div :class="['navbar-menu', { 'is-active': isMenuOpen }]">
        <RouterLink v-if="!hasRole('ROLE_ADMIN')" to="/">Acceuil</RouterLink>
        <div v-if="!isUserDefined" class="dropdown" :class="{ 'is-active': isDropdownOpen }">
          <button class="dropdown-trigger" @click="toggleDropdown">
            <User class="icon" :size="30" color="white" :stroke-width="2.25" />
          </button>
          <div class="dropdown-menu">
            <div class="dropdown-content">
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

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.dropdown-menu {
  display: none;
  position: absolute;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 0;
}

.dropdown.is-active .dropdown-menu {
  display: block;
}

.dropdown-item {
  padding: 16px 16px;
  text-decoration: none;
  display: block;
  color: black;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}

.mobile-menu {
  display: none;
}

@media (max-width: 768px) {
  .dropdown {
    display: none;
  }
  .mobile-menu {
    display: block;
  }
  .mobile-item {
    padding: 16px 16px;
    text-decoration: none;
    display: block;
    color: color(white);
  }
}
</style>
