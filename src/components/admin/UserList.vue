<script setup lang="ts">
import { useRouter } from 'vue-router'
import { deleteUserById } from '@/api/admin/user.api'
import type { User } from '@/interfaces/auth/user.interface'
import { Edit, Trash } from 'lucide-vue-next'

const router = useRouter()

const props = defineProps<{
  users: User[]
}>()

const emit = defineEmits<{
  (e: 'userDeleted', id: number): void
}>()

const editUser = (id: number): void => {
  router.push({ name: 'AdminUserEdit', params: { id } })
}

const deleteUser = async (id: number): Promise<void> => {
  try {
    await deleteUserById(id)
    emit('userDeleted', id)
  } catch (error) {
    console.error('Failed to delete user:', error)
  }
}

const roleMapping: Record<string, string> = {
  ROLE_USER: 'Utilisateur',
  ROLE_ADMIN: 'Administrateur'
}

const formatRoles = (roles: string[]): string => {
  return roles.map((role) => roleMapping[role] || role).join(', ')
}
</script>

<template>
  <table class="table-admin">
    <thead>
      <tr>
        <th>Nom et prénom</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in props.users" :key="user.id">
        <td>{{ user.lastName }} {{ user.firstName }}</td>
        <td>{{ user.email }}</td>
        <td>{{ formatRoles(user.roles) }}</td>
        <td>
          <button @click="editUser(user.id)" class="button-edit">
            <Edit class="icon" :size="16" :stroke-width="2.5" /> Modifier
          </button>
          <button @click="deleteUser(user.id)" class="button-delete">
            <Trash class="icon" :size="16" :stroke-width="2.5" /> Supprimer
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
