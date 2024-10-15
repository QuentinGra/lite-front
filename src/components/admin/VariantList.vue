<script setup lang="ts">
import { useRouter } from 'vue-router'
import { deleteBookVariantById } from '@/api/admin/variant.api'
import type { BookVariant } from '@/interfaces/admin/variant.interface'
import { Edit, Trash } from 'lucide-vue-next'

const router = useRouter()

const props = defineProps<{
  bookVariants: BookVariant[]
}>()

const emit = defineEmits<{
  (e: 'bookVariantDeleted', id: number): void
}>()

const editBookVariant = (id: number): void => {
  router.push({ name: 'AdminVariantEdit', params: { id } })
}

const deleteBookVariant = async (id: number): Promise<void> => {
  try {
    await deleteBookVariantById(id)
    emit('bookVariantDeleted', id)
  } catch (error) {
    console.error('Failed to delete book variant:', error)
  }
}
</script>

<template>
  <table class="table-admin">
    <thead>
      <tr>
        <th>Type</th>
        <th>Actif</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="variant in props.bookVariants" :key="variant.id">
        <td>{{ variant.type }}</td>
        <td>{{ variant.enable ? 'Actif' : 'Inactif' }}</td>
        <td>
          <button @click="editBookVariant(variant.id)" class="button-edit">
            <Edit class="icon" :size="16" :stroke-width="2.5" /> Modifier
          </button>
          <button @click="deleteBookVariant(variant.id)" class="button-delete">
            <Trash class="icon" :size="16" :stroke-width="2.5" /> Supprimer
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
