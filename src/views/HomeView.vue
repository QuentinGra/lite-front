<script setup lang="ts">
import BookLatest from '@/components/public/book/BookLatest.vue'
</script>

<template>
  <section class="container">
    <div class="home-presentation">
      <h1 class="home-title">Bienvenue sur Lite</h1>
      <p class="home-description">
        Bienvenue sur Lite, votre nouvelle plateforme dédiée aux amoureux de la lecture. Que vous
        soyez passionné de romans, de poésie, d'essais ou de tout autre genre littéraire, Lite est
        l'endroit idéal pour découvrir de nouveaux livres, partager vos impressions et rejoindre une
        communauté de lecteurs passionnés.
      </p>
      <p class="home-description">
        Sur Lite, vous pouvez garder une trace de vos lectures. Notre mission est de créer un espace
        où chaque lecteur peut trouver son prochain coup de cœur littéraire et partager ses
        découvertes avec une communauté bienveillante.
      </p>
      <p class="home-description">
        Rejoignez-nous dès aujourd'hui et plongez dans l'univers fascinant de la littérature avec
        Lite. Découvrez les derniers livres ajoutés et trouvez votre prochaine lecture.
      </p>
      <div class="home-cta">
        <RouterLink to="/inscription" class="button-primary">Rejoindre la communauté</RouterLink>
        <RouterLink to="/livres" class="button-secondary">Voir tous les livres</RouterLink>
      </div>
    </div>
    <h2 class="home-subtitle">Derniers livres ajoutés</h2>
    <BookLatest />
  </section>
</template>
