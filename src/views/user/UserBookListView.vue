<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Plus, Trash2 } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { createList, fetchList, deleteList } from '@/api/user/list.api'
import BaseModal from '@/components/common/BaseModal.vue'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
import type { List } from '@/interfaces/list.interface'

const router = useRouter()
const lists = ref<List[]>([])
const newListName = ref<string>('')
const isModalOpen = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const errorMessage = ref<string>('')
const isDeleteModalOpen = ref<boolean>(false)
const selectedListId = ref<number | null>(null)

const loadLists = async (): Promise<void> => {
  try {
    const response: List[] = await fetchList()
    lists.value = response
  } catch (error) {
    errorMessage.value = 'Impossible de charger les listes'
  }
}

const handleCreateList = async (): Promise<void> => {
  if (!newListName.value.trim()) return

  isLoading.value = true
  try {
    await createList(newListName.value)
    await loadLists()
    newListName.value = ''
    isModalOpen.value = false
  } catch (error) {
    errorMessage.value = 'Impossible de créer la liste'
  } finally {
    isLoading.value = false
  }
}

const openDeleteModal = (listId: number): void => {
  selectedListId.value = listId
  isDeleteModalOpen.value = true
}

const handleDeleteList = async (): Promise<void> => {
  if (!selectedListId.value) return

  isLoading.value = true
  try {
    await deleteList(selectedListId.value)
    await loadLists()
    isDeleteModalOpen.value = false
  } catch (error) {
    errorMessage.value = 'Impossible de supprimer la liste'
  } finally {
    isLoading.value = false
  }
}

const navigateToListDetail = (listId: number): void => {
  router.push({ name: 'ListDetail', params: { id: listId } })
}

onMounted((): void => {
  loadLists()
})
</script>

<template>
  <div class="lists-container">
    <div v-if="errorMessage" class="form-error">{{ errorMessage }}</div>

    <button class="create-btn" @click="isModalOpen = true">
      <Plus size="24" />
      Créer une liste
    </button>

    <div class="lists-grid">
      <div
        v-for="list in lists"
        :key="list.id"
        class="list-item"
        @click="navigateToListDetail(list.id)"
      >
        <div class="list-content">
          <h3>{{ list.name }}</h3>
          <button class="delete-btn" @click.stop="openDeleteModal(list.id)">
            <Trash2 size="20" />
          </button>
        </div>
      </div>
    </div>

    <!-- Base Modal component -->
    <BaseModal
      :is-open="isModalOpen"
      :is-loading="isLoading"
      :error-message="errorMessage"
      title="Créer une liste"
      confirm-text="Créer"
      @cancel="isModalOpen = false"
      @confirm="handleCreateList"
    >
      <div class="form-group">
        <label>Nom de la liste</label>
        <input
          v-model="newListName"
          type="text"
          placeholder="Ma liste de lecture"
          class="form-input"
        />
      </div>
    </BaseModal>

    <!-- Confirm Modal component -->
    <ConfirmModal
      :is-open="isDeleteModalOpen"
      :is-loading="isLoading"
      :error-message="errorMessage"
      title="Supprimer la liste"
      message="Êtes-vous sûr de vouloir supprimer cette liste ?"
      @cancel="isDeleteModalOpen = false"
      @confirm="handleDeleteList"
    />
  </div>
</template>
