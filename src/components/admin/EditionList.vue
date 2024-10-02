<script setup lang="ts">
import { useRouter } from 'vue-router'
import { deleteEditionById } from '@/api/admin/edition.api'
import type { Edition } from '@/interfaces/admin/edition.interface'

const router = useRouter()

const props = defineProps<{
  editions: Edition[]
}>()

const emit = defineEmits<{
  (e: 'editionDeleted', id: number): void
}>()

const editEdition = (id: number): void => {
  router.push({ name: 'AdminEditionEdit', params: { id } })
}

const deleteEdition = async (id: number): Promise<void> => {
  try {
    await deleteEditionById(id)
    emit('editionDeleted', id)
  } catch (error) {
    console.error('Failed to delete edition:', error)
  }
}
</script>

<template>
  <table class="table-admin">
    <thead>
      <tr>
        <th>Nom</th>
        <th>Actif</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="edition in props.editions" :key="edition.id">
        <td>{{ edition.name }}</td>
        <td>{{ edition.enable ? 'Actif' : 'Inactif' }}</td>
        <td>
          <button @click="editEdition(edition.id)" class="button-edit">Modifier</button>
          <button @click="deleteEdition(edition.id)" class="button-delete">Supprimer</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
