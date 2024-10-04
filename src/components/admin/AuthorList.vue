<script setup lang="ts">
import { useRouter } from 'vue-router'
import { deleteAuthorById } from '@/api/admin/author.api'
import type { Author } from '@/interfaces/admin/author.interface'

const router = useRouter()

const props = defineProps<{
  authors: Author[]
}>()

const emit = defineEmits<{
  (e: 'authorDeleted', id: number): void
}>()

const editAuthor = (id: number): void => {
  router.push({ name: 'AdminAuthorEdit', params: { id } })
}

const deleteAuthor = async (id: number): Promise<void> => {
  try {
    await deleteAuthorById(id)
    emit('authorDeleted', id)
  } catch (error) {
    console.error('Failed to delete author:', error)
  }
}
</script>

<template>
  <table class="table-admin">
    <thead>
      <tr>
        <th>Nom et prénom</th>
        <th>Actif</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="author in props.authors" :key="author.id">
        <td>{{ author.lastName }} {{ author.firstName }}</td>
        <td>{{ author.enable ? 'Actif' : 'Inactif' }}</td>
        <td>
          <button @click="editAuthor(author.id)" class="button-edit">Modifier</button>
          <button @click="deleteAuthor(author.id)" class="button-delete">Supprimer</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
