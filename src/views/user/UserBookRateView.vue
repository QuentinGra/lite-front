<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Star, Trash2 } from 'lucide-vue-next'
import { fetchRating, deleteRating } from '@/api/user/rating.api'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
import type { Rating } from '@/interfaces/user/rating.interface'

const ratings = ref<Rating[]>([])
const errorMessage = ref<string>('')
const isModalOpen = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const selectedRatingId = ref<number | null>(null)

const loadRatings = async (): Promise<void> => {
  try {
    ratings.value = await fetchRating()
  } catch (error) {
    errorMessage.value = 'Impossible de charger les notes'
  }
}

const openDeleteModal = (ratingId: number): void => {
  selectedRatingId.value = ratingId
  isModalOpen.value = true
}

const handleDeleteRating = async (): Promise<void> => {
  if (!selectedRatingId.value) return

  isLoading.value = true
  try {
    await deleteRating(selectedRatingId.value)
    await loadRatings()
    isModalOpen.value = false
  } catch (error) {
    errorMessage.value = 'Impossible de supprimer la note'
  } finally {
    isLoading.value = false
  }
}

onMounted((): void => {
  loadRatings()
})
</script>

<template>
  <div class="ratings-container">
    <div v-if="errorMessage" class="form-error">{{ errorMessage }}</div>

    <div class="ratings-list">
      <div v-for="rating in ratings" :key="rating.id" class="rating-item">
        <h3>{{ rating.book.name }}</h3>
        <div class="stars">
          <Star
            v-for="star in 5"
            :key="star"
            :class="['star', { 'star-filled': star <= rating.rating }]"
            :size="24"
          />
        </div>
        <button class="delete-btn" @click="openDeleteModal(rating.id)">
          <Trash2 :size="20" />
        </button>
      </div>
    </div>
    <ConfirmModal
      :is-open="isModalOpen"
      :is-loading="isLoading"
      :error-message="errorMessage"
      title="Supprimer la note"
      message="Êtes-vous sûr de vouloir supprimer cette note ?"
      @cancel="isModalOpen = false"
      @confirm="handleDeleteRating"
    />
  </div>
</template>
