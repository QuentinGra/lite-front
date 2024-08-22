<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { createZodPlugin } from '@formkit/zod'
import { z } from 'zod'
import router from '@/router'
import { login } from '@/services/login.api'

const loginSchema = z.object({
  username: z.string().email({ message: 'Email invalide' }),
  password: z.string().min(8, { message: 'Mot de passe invalide' })
})

const errorMessage: Ref<string> = ref('')

const [zodPlugin, submitHandler] = createZodPlugin(loginSchema, async (values) => {
  try {
    const response = await login(values.username, values.password)
    if (response) {
      router.push('/')
    }
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Une erreur est survenue'
    }
  }
})
</script>

<template>
  <h1>Connexion</h1>
  <div v-if="errorMessage">{{ errorMessage }}</div>
  <FormKit type="form" submit-label="Connexion" :plugins="[zodPlugin]" @submit="submitHandler">
    <FormKit type="email" name="username" validation="required" help="Entrer votre adresse mail" />
    <FormKit
      type="password"
      name="password"
      validation="required"
      help="Entrer votre mot de passe"
    />
  </FormKit>
</template>
