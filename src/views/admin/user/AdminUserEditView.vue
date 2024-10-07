<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { createZodPlugin } from '@formkit/zod'
import { userSchema } from '@/schemas/admin/user.schema'
import { fetchUserById, updateUser } from '@/api/admin/user.api'
import type { UserWithTimestampsInterface } from '@/interfaces/auth/user.interface'

const router = useRouter()
const route = useRoute()
const errorMessage = ref<string>('')

const state = reactive<Partial<UserWithTimestampsInterface>>({
  id: 0,
  lastName: '',
  firstName: '',
  email: '',
  roles: 'ROLE_USER'
})

const roles = ref([
  { value: 'ROLE_USER', label: 'Utilisateur' },
  { value: 'ROLE_ADMIN', label: 'Administrateur' }
])

const loadUser = async (): Promise<void> => {
  const userId = Number(route.params.id)
  try {
    const data: UserWithTimestampsInterface = await fetchUserById(userId)
    Object.assign(state, data)
  } catch (error) {
    errorMessage.value = "Impossible de charger les informations de l'utilisateur"
  }
}

const saveUserRole = async (): Promise<void> => {
  console.log(state)

  try {
    await updateUser(state.id!, state)
    router.push({ name: 'AdminUser' })
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Une erreur est survenue'
    }
  }
}

onMounted((): void => {
  loadUser()
})

const [zodPlugin, submitHandler] = createZodPlugin(userSchema, saveUserRole)
</script>

<template>
  <div>
    <h1 class="title">Modification du rôle de l'utilisateur</h1>
    <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
    <FormKit type="form" submit-label="Enregistrer" :plugins="[zodPlugin]" @submit="submitHandler">
      <div>
        <p class="user-name"><b>Nom:</b> {{ state.lastName }} {{ state.firstName }}</p>
        <p class="user-email"><b>Email:</b> {{ state.email }}</p>
      </div>
      <FormKit
        type="select"
        name="role"
        v-model="state.roles"
        :options="roles"
        multiple
        validation="required"
        validation-label="Le rôle de l'utilisateur"
        help="Sélectionnez le rôle de l'utilisateur."
      />
    </FormKit>
  </div>
</template>
