<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createZodPlugin } from '@formkit/zod'
import { register } from '@/api/auth/register.api'
import { registerSchema } from '@/schemas/auth/register.schema'
import type { RegisterValues } from '@/interfaces/auth/register.interface'

const errorMessage = ref('')
const router = useRouter()

const handleRegister = async (values: RegisterValues) => {
  try {
    const { ...registerValues } = values
    console.log(registerValues)

    const response = await register(
      registerValues.email,
      registerValues.password,
      registerValues.firstName,
      registerValues.lastName,
      registerValues.birthDate
    )

    if (response) router.push('/connexion')
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Une erreur est survenue'
    }
  }
}

const [zodPlugin, submitHandler] = createZodPlugin(registerSchema, handleRegister)
</script>

<template>
  <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
  <FormKit type="form" submit-label="Inscription" :plugins="[zodPlugin]" @submit="submitHandler">
    <FormKit
      type="email"
      name="email"
      validation="required"
      placeholder="exemple@gmail.com"
      help="Entrer votre adresse mail"
    />
    <FormKit
      type="password"
      name="password"
      validation="required"
      placeholder="********"
      help="Entrer votre mot de passe"
    />
    <FormKit
      type="password"
      name="confirmationPassword"
      validation="required"
      placeholder="********"
      help="Confirmer votre mot de passe"
    />
    <FormKit type="text" name="firstName" placeholder="Paul" help="Entrer votre prénom" />
    <FormKit type="text" name="lastName" placeholder="Dupont" help="Entrer votre nom" />
    <FormKit type="date" name="birthDate" help="Entrer votre date d'anniversaire" />
  </FormKit>
</template>
