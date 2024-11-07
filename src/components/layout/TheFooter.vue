<script setup lang="ts">
import { Linkedin } from 'lucide-vue-next'
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-links">
        <RouterLink to="/mentions-legales">Mentions légales</RouterLink>
        <RouterLink to="/politique-confidentialite">Politique de confidentialité</RouterLink>
        <RouterLink to="/politique-cookies">Cookies</RouterLink>
      </div>
      <div class="footer-social">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <Linkedin class="icon" :size="24" :stroke-width="2" />
        </a>
      </div>
    </div>
  </footer>
</template>
