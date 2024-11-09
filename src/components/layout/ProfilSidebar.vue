<script setup lang="ts">
import { KeyRound, BookOpen, Star, Trash } from 'lucide-vue-next'
</script>

<template>
  <aside class="sidebar">
    <nav>
      <ul>
        <li>
          <router-link to="/profil/list">
            <BookOpen class="icon" :size="16" :stroke-width="2.5" /> Listes de lecture
          </router-link>
        </li>
        <li>
          <router-link to="/profil/note">
            <Star class="icon" :size="16" :stroke-width="2.5" /> Notes
          </router-link>
        </li>
        <li>
          <router-link to="/profil/securite">
            <KeyRound class="icon" :size="16" :stroke-width="2.5" /> Mot de passe
          </router-link>
        </li>
        <li>
          <router-link to="/profil/suppression">
            <Trash class="icon" :size="16" :stroke-width="2.5" /> Suppression
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>
