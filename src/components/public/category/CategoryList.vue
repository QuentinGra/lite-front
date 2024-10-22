<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { fetchCategories } from '@/api/admin/category.api'
import { BookOpen, Rocket, Fingerprint, BookType, Flame, HelpCircle, Heart } from 'lucide-vue-next'
import type { Category } from '@/interfaces/admin/category.interface'
import type { FunctionalComponent } from 'vue'
import type { LucideProps } from 'lucide-vue-next'

const search = ref<string>('')
const categories = ref<Category[]>([])
const errorMessage = ref<string>('')

interface CategoryIcons {
  [key: string]: FunctionalComponent<LucideProps>
}

const categoryIcons: CategoryIcons = {
  Classique: BookOpen,
  Rommance: Heart,
  'Science Fiction': Rocket,
  Mystère: Fingerprint,
  Biography: BookType,
  Fantaisie: Flame
}

const getCategoryIcon = (categoryName: string): FunctionalComponent<LucideProps> => {
  return categoryIcons[categoryName] || HelpCircle
}

const filteredCategories = computed<Category[]>(() => {
  return categories.value.filter((category: Category) =>
    category.name.toLowerCase().startsWith(search.value.toLowerCase())
  )
})

const loadCategories = async (): Promise<void> => {
  try {
    const categoryList: Category[] = await fetchCategories()
    categories.value = categoryList
  } catch (error) {
    errorMessage.value = 'Impossible de charger les catégories'
  }
}

onMounted(() => {
  loadCategories()
})
</script>

<template>
  <h1 class="categories-title">Catégories</h1>

  <div class="categories-filters">
    <input
      v-model="search"
      class="categories-search"
      type="text"
      placeholder="Rechercher une catégorie..."
    />
  </div>

  <div class="categories-grid">
    <div v-for="category in filteredCategories" :key="category.id" class="category-card">
      <div class="category-card-header">
        <component :is="getCategoryIcon(category.name)" class="category-card-icon" />
        <h2 class="category-card-title">{{ category.name }}</h2>
      </div>
      <p class="category-card-description">{{ category.description }}</p>
      <button class="category-card-button">Explore {{ category.name }}</button>
    </div>
  </div>

  <p v-if="filteredCategories.length === 0" class="categories-no-results">
    Aucune catégories ne correspond à votre recherche.
  </p>
</template>
