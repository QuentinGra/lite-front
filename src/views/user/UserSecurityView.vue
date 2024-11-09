<script setup lang="ts">
import { ref } from 'vue'
import { createZodPlugin } from '@formkit/zod'
import { useAuthStore } from '@/stores/authStore'
import { passwordSchema } from '@/schemas/user/password.schema'
import type { z } from 'zod'

type PasswordSchema = z.infer<typeof passwordSchema>

const authStore = useAuthStore()
const errorMessage = ref<string>('')
const infoMessage = ref<string>('')

const updatePassword = async (formData: PasswordSchema): Promise<void> => {
  try {
    const response = await fetch(`https://127.0.0.1:8000/api/user/${authStore.user?.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ password: formData.password })
    })

    if (!response.ok) throw new Error('Failed to update password')
  } catch (error) {
    throw new Error('Failed to update password')
  }
}

const handleUpdate = async (formData: PasswordSchema): Promise<void> => {
  try {
    await updatePassword(formData)
    infoMessage.value = 'Le mot de passe a été modifié avec succès'
  } catch (error) {
    errorMessage.value = 'Une erreur est survenue lors de la modification'
  }
}

const [zodPlugin, submitHandler] = createZodPlugin(passwordSchema, handleUpdate)
</script>

<template>
  <section class="container">
    <h1 class="title">Sécurité</h1>
    <p class="content-security">Modifier votre mot de passe</p>

    <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
    <div class="form-info" v-if="infoMessage">{{ infoMessage }}</div>
    <FormKit type="form" submit-label="Modifier" :plugins="[zodPlugin]" @submit="submitHandler">
      <FormKit
        type="password"
        name="password"
        validation="required"
        validation-label="Le mot de passe"
        placeholder="********"
        help="Entrer votre nouveau mot de passe"
      />
      <FormKit
        type="password"
        name="confirmationPassword"
        validation="required"
        validation-label="Confirmation du mot de passe"
        placeholder="********"
        help="Confirmer votre nouveau mot de passe"
      />
    </FormKit>
  </section>
</template>
