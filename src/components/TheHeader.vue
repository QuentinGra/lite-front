<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

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
      <div class="navbar-burger" @click="toggleMenu">
        <span></span>
      </div>
      <div :class="['navbar-menu', { 'is-active': isMenuOpen }]">
        <RouterLink to="/">Home</RouterLink>
      </div>
    </nav>
  </header>
</template>
