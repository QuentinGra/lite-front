<script setup lang="ts">
defineProps<{
  isOpen: boolean
  isLoading: boolean
  errorMessage?: string
  title: string
  message: string
}>()

defineEmits<{
  (e: 'cancel'): void
  (e: 'confirm'): void
}>()
</script>

<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>

      <div class="modal-actions">
        <button class="cancel-btn" @click="$emit('cancel')" :disabled="isLoading">Annuler</button>
        <button class="confirm-btn" @click="$emit('confirm')" :disabled="isLoading">
          {{ isLoading ? 'Suppression...' : 'Confirmer' }}
        </button>
      </div>

      <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>
    </div>
  </div>
</template>
