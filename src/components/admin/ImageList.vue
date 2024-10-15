<script setup lang="ts">
import { deleteImageById } from '@/api/admin/image.api'
import { defineProps } from 'vue'
import type { Image } from '@/interfaces/admin/image.interface'
import { Trash } from 'lucide-vue-next'

const IMAGE_PATH = import.meta.env.VITE_IMAGE_URL_LOCAL

const props = defineProps<{
  images: Image[]
}>()

const emit = defineEmits<{
  (e: 'imageDeleted', id: number): void
}>()

const deleteImage = async (id: number): Promise<void> => {
  try {
    await deleteImageById(id)
    emit('imageDeleted', id)
  } catch (error) {
    console.error('Failed to delete image:', error)
  }
}
</script>

<template>
  <table class="table-admin">
    <thead>
      <tr>
        <th>Image</th>
        <th>Actif</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="image in props.images" :key="image.id">
        <td>
          <img :src="IMAGE_PATH + image.imageName" alt="Image" class="image-thumbnail" />
        </td>
        <td>{{ image.enable ? 'Actif' : 'Inactif' }}</td>
        <td>
          <button @click="deleteImage(image.id)" class="button-delete">
            <Trash class="icon" :size="16" :stroke-width="2.5" /> Supprimer
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
