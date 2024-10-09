<script setup lang="ts">
import { useRouter } from 'vue-router'
import { deleteBookById } from '@/api/admin/book.api'
import type { Book } from '@/interfaces/admin/book.interface'
import { Edit, Trash } from 'lucide-vue-next'

const router = useRouter()

const props = defineProps<{
  books: Book[]
}>()

const emit = defineEmits<{
  (e: 'bookDeleted', id: number): void
}>()

const editBook = (id: number): void => {
  router.push({ name: 'AdminBookEdit', params: { id } })
}

const deleteBook = async (id: number): Promise<void> => {
  try {
    await deleteBookById(id)
    emit('bookDeleted', id)
  } catch (error) {
    console.error('Failed to delete book:', error)
  }
}
</script>

<template>
  <table class="table-admin">
    <thead>
      <tr>
        <th>Titre</th>
        <th>Auteur</th>
        <th>Edition</th>
        <th>Categories</th>
        <th>Actif</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in props.books" :key="book.id">
        <td>{{ book.name }}</td>
        <td>{{ book.author.lastName }} {{ book.author.firstName }}</td>
        <td>{{ book.edition.name }}</td>
        <td>{{ book.categories.map((category) => category.name).join(', ') }}</td>
        <td>{{ book.enable ? 'Actif' : 'Inactif' }}</td>
        <td>
          <button @click="editBook(book.id)" class="button-edit">
            <Edit class="icon" :size="16" :stroke-width="2.5" /> Modifier
          </button>
          <button @click="deleteBook(book.id)" class="button-delete">
            <Trash class="icon" :size="16" :stroke-width="2.5" /> Supprimer
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
