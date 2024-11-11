<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Trash2 } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { fetchListById } from '@/api/user/list.api'
import { removeBookFromList } from '@/api/user/bookList.api'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
import type { List } from '@/interfaces/user/list.interface'

type ReadingStatus = 'reading' | 'read' | 'wish'

const STATUS_OPTIONS: Record<ReadingStatus, string> = {
  reading: 'En cours de lecture',
  read: 'Lu',
  wish: 'À lire'
} as const

const route = useRoute()
const list = ref<List | null>(null)
const errorMessage = ref<string>('')
const isModalOpen = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const selectedBookId = ref<number | null>(null)

const loadList = async (): Promise<void> => {
  const listId: number = Number(route.params.id)
  try {
    list.value = await fetchListById(listId)
  } catch (error) {
    errorMessage.value = 'Impossible de charger la liste'
  }
}

const handleDeleteBookFromList = async (): Promise<void> => {
  if (!selectedBookId.value || !list.value) return

  isLoading.value = true
  try {
    await removeBookFromList(selectedBookId.value)
    await loadList()
    isModalOpen.value = false
  } catch (error) {
    errorMessage.value = 'Impossible de supprimer la liste'
  } finally {
    isLoading.value = false
  }
}

const openDeleteModal = (readingListBookId: number): void => {
  selectedBookId.value = readingListBookId
  isModalOpen.value = true
}

onMounted((): void => {
  loadList()
})
</script>

<template>
  <div class="list-detail-container">
    <div v-if="errorMessage" class="form-error">{{ errorMessage }}</div>

    <div class="books-list">
      <div v-for="item in list?.readingListBooks" :key="item.book.name" class="book-item-list">
        <h3>{{ item.book.name }}</h3>
        <div class="status">
          {{ item.status in STATUS_OPTIONS ? STATUS_OPTIONS[item.status as ReadingStatus] : '' }}
        </div>
        <button class="delete-btn" @click="openDeleteModal(item.id)">
          <Trash2 :size="20" />
        </button>
      </div>
    </div>

    <ConfirmModal
      :is-open="isModalOpen"
      :is-loading="isLoading"
      :error-message="errorMessage"
      title="Supprimer la liste"
      message="Êtes-vous sûr de vouloir supprimer cette liste ?"
      @cancel="isModalOpen = false"
      @confirm="handleDeleteBookFromList"
    />
  </div>
</template>
