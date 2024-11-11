<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { deleteUserById } from '@/api/admin/user.api'
import { deleteCookie } from '@/utils/cookie.utils'
import ConfirmModal from '@/components/common/ConfirmModal.vue'

const authStore = useAuthStore()
const router = useRouter()

const showConfirm = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const errorMessage = ref<string>('')

const handleConfirm = async () => {
  if (!authStore.user?.id) {
    errorMessage.value = 'Utilisateur non trouvé'
    return
  }

  try {
    isLoading.value = true
    await deleteUserById(authStore.user.id)

    deleteCookie('LOGIN')
    authStore.clearUser()
    router.push('/')
  } catch (error) {
    errorMessage.value = 'Une erreur est survenue lors de la suppression'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="container">
    <h1 class="title">Suppression du compte</h1>
    <p>Vous êtes sur le point de supprimer votre compte. Cette action est irréversible.</p>

    <div class="actions">
      <button class="delete-btn" @click="showConfirm = true">Supprimer mon compte</button>
    </div>

    <ConfirmModal
      :is-open="showConfirm"
      :is-loading="isLoading"
      :error-message="errorMessage"
      title="Confirmer la suppression"
      message="Êtes-vous sûr de vouloir supprimer votre compte ?"
      @cancel="showConfirm = false"
      @confirm="handleConfirm"
    />
  </section>
</template>
