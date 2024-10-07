<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import UserList from '@/components/admin/UserList.vue'
import { fetchUsers } from '@/api/admin/user.api'
import type { UserWithTimestampsInterface, UserState } from '@/interfaces/auth/user.interface'

const search = ref<string>('')
const errorMessage = ref<string>('')
const state = reactive<UserState>({
  users: []
})

const filteredUsers = computed<UserWithTimestampsInterface[]>(() => {
  return state.users.filter((user: UserWithTimestampsInterface) =>
    user.email.toLowerCase().includes(search.value.toLowerCase())
  )
})

const loadUsers = async (): Promise<void> => {
  try {
    const data: UserWithTimestampsInterface[] = await fetchUsers()
    state.users = data
  } catch (error) {
    errorMessage.value = 'Impossible de charger les utilisateurs'
  }
}

const handleUserDeleted = (id: number): void => {
  state.users = state.users.filter((user: UserWithTimestampsInterface) => user.id !== id)
}

onMounted((): void => {
  loadUsers()
})
</script>

<template>
  <div>
    <h1 class="title">Liste des utilisateurs</h1>
    <label for="search-input" class="search-label">Rechercher un utilisateur</label>
    <div class="button-container">
      <input type="text" v-model="search" placeholder="Email" class="search-input" />
    </div>
    <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
    <UserList :users="filteredUsers" @user-deleted="handleUserDeleted" />
  </div>
</template>
