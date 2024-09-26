<script setup lang="ts">
// FIXME: Le bouton edit ne marche pas

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['edit', 'delete'])

const editCategory = () => {
  emits('edit', props.category.id)
}

const deleteCategory = () => {
  emits('delete', props.category.id)
}
</script>

<template>
  <li>
    {{ category.name }}
    <button @click="editCategory">Edit</button>
    <button @click="deleteCategory">Delete</button>
  </li>
</template>
