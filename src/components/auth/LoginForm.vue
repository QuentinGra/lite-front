<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createZodPlugin } from '@formkit/zod'
import { login } from '@/services/login.api'
import { loginSchema } from '@/schemas/login.schema'
import type { LoginValues } from '@/interfaces/login.interface'

const errorMessage = ref('')
const router = useRouter()

const handleLogin = async (values: LoginValues) => {
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
}

const [zodPlugin, submitHandler] = createZodPlugin(loginSchema, handleLogin)
</script>

<template>
  <div class="container-login">
    <h2 class="form-title">Connexion</h2>
    <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
    <FormKit type="form" submit-label="Connexion" :plugins="[zodPlugin]" @submit="submitHandler">
      <FormKit
        type="email"
        name="username"
        validation="required"
        help="Entrer votre adresse mail"
      />
      <FormKit
        type="password"
        name="password"
        validation="required"
        help="Entrer votre mot de passe"
      />
    </FormKit>
  </div>
</template>
