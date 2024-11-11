<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showBanner = ref(true)

const acceptCookies = () => {
  localStorage.setItem('cookiesAccepted', 'true')
  showBanner.value = false
  console.log('Cookies accepted')
}

const refuseCookies = () => {
  localStorage.setItem('cookiesAccepted', 'false')
  showBanner.value = false
  console.log('Cookies refused')
}

onMounted(() => {
  const cookiesAccepted = localStorage.getItem('cookiesAccepted')
  if (cookiesAccepted === 'true' || cookiesAccepted === 'false') {
    showBanner.value = false
  }
})
</script>

<template>
  <Transition name="slide-fade">
    <div v-if="showBanner" class="cookie-banner">
      <div class="cookie-banner-content">
        <p>
          Nous utilisons des cookies pour améliorer votre expérience sur notre site. Vous pouvez
          choisir d'accepter ou de refuser ces cookies.
        </p>
        <div class="cookie-banner-buttons">
          <button @click="acceptCookies" class="cookie-banner-button accept">Accepter</button>
          <button @click="refuseCookies" class="cookie-banner-button refuse">Refuser</button>
        </div>
      </div>
    </div>
  </Transition>
</template>
