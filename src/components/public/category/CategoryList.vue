<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { fetchCategories } from '@/api/admin/category.api'
import {
  BookOpen,
  Coffee,
  Rocket,
  Fingerprint,
  BookType,
  Flame,
  HelpCircle,
  Heart
} from 'lucide-vue-next'
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

<style lang="scss" scoped>
// TODO: Déporter le style dans un fichier dédié
.categories-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #333;
}

.categories-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.categories-search {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 1rem;
}

.categories-search {
  flex-grow: 1;
}

.categories-select {
  min-width: 120px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .categories-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.category-card {
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.category-card-header {
  display: flex;
  align-items: center;
  padding: 1.5rem 1.5rem 0.5rem;
}

.category-card-icon {
  width: 2rem;
  margin-right: 1rem;
  color: #3b82f6;
}

.category-card-title {
  margin-bottom: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.category-card-description {
  padding: 0 1.5rem 1.5rem;
  text-align: left;
  color: #4b5563;
  flex-grow: 1;
  font-size: 0.95rem;
  line-height: 1.5;
}

.category-card-button {
  background-color: #3b82f6;
  color: #ffffff;
  font-weight: bold;
  padding: 0.75rem 1rem;
  width: 100%;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1rem;
}

.category-card-button:hover {
  background-color: #2563eb;
}

.category-card-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}

.categories-no-results {
  text-align: center;
  color: #6b7280;
  font-style: italic;
  margin-top: 1rem;
}

@media (max-width: 640px) {
  .categories {
    padding: 1rem;
  }

  .categories-title {
    font-size: 1.75rem;
  }

  .category-card-title {
    font-size: 1.1rem;
  }

  .category-card-description {
    font-size: 0.9rem;
  }

  .category-card-button {
    font-size: 0.95rem;
  }
}
</style>
