<script setup lang="ts">
defineProps<{
  isOpen: boolean
  isLoading: boolean
  errorMessage?: string
  title: string
  confirmText?: string
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

      <div class="modal-content">
        <slot></slot>
      </div>

      <div class="modal-actions">
        <button class="cancel-btn" @click="$emit('cancel')" :disabled="isLoading">Annuler</button>
        <button class="confirm-btn black" @click="$emit('confirm')" :disabled="isLoading">
          {{ isLoading ? 'Chargement...' : confirmText || 'Confirmer' }}
        </button>
      </div>

      <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>
    </div>
  </div>
</template>
