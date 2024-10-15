<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { createZodPlugin } from '@formkit/zod'
import { bookUpdateSchema } from '@/schemas/admin/book.schema'
import { fetchBookById, updateBook } from '@/api/admin/book.api'
import { fetchAuthors } from '@/api/admin/author.api'
import { fetchEditions } from '@/api/admin/edition.api'
import { fetchCategories } from '@/api/admin/category.api'
import { fetchBookVariants } from '@/api/admin/variant.api'
import type { Book } from '@/interfaces/admin/book.interface'
import type { Edition, EditionState } from '@/interfaces/admin/edition.interface'
import type { Author, AuthorState } from '@/interfaces/admin/author.interface'
import type { Category, CategoryState } from '@/interfaces/admin/category.interface'
import type { BookVariant, VariantState } from '@/interfaces/admin/variant.interface'

const router = useRouter()
const route = useRoute()
const errorMessage = ref<string>('')

const editions = reactive<EditionState>({ editions: [] })
const authors = reactive<AuthorState>({ authors: [] })
const categories = reactive<CategoryState>({ categories: [] })
const variants = reactive<VariantState>({ variants: [] })

const state = reactive<any>({
  id: 0,
  name: '',
  description: '',
  enable: false,
  edition: 1,
  author: 1,
  categories: [],
  bookVariants: []
})

const loadBook = async (): Promise<void> => {
  const bookId: number = Number(route.params.id)
  try {
    const data: Book = await fetchBookById(bookId)
    Object.assign(state, {
      ...data,
      author: data.author.id,
      edition: data.edition.id,
      categories: data.categories.map((category) => category.id),
      bookVariants: data.bookVariants.map((variant) => variant.id)
    })
  } catch (error) {
    errorMessage.value = 'Impossible de charger le livre'
  }
}

const loadAuthors = async (): Promise<void> => {
  try {
    const data: Author[] = await fetchAuthors()
    authors.authors = data
  } catch (error) {
    errorMessage.value = 'Impossible de charger les auteurs'
  }
}

const loadEditions = async (): Promise<void> => {
  try {
    const data: Edition[] = await fetchEditions()
    editions.editions = data
  } catch (error) {
    errorMessage.value = "Impossible de charger les maisons d'éditions"
  }
}

const loadCategories = async (): Promise<void> => {
  try {
    const data: Category[] = await fetchCategories()
    categories.categories = data
  } catch (error) {
    errorMessage.value = 'Impossible de charger les catégories'
  }
}

const loadVariants = async (): Promise<void> => {
  try {
    const data: BookVariant[] = await fetchBookVariants()
    variants.variants = data
  } catch (error) {
    errorMessage.value = 'Impossible de charger les variants de livre'
  }
}

const saveBook = async (): Promise<void> => {
  try {
    await updateBook(state.id!, state)
    router.push({ name: 'AdminBook' })
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Une erreur est survenue'
    }
  }
}

onMounted((): void => {
  loadBook()
  loadAuthors()
  loadEditions()
  loadCategories()
  loadVariants()
})

const [zodPlugin, submitHandler] = createZodPlugin(bookUpdateSchema, saveBook)
</script>

<template>
  <div>
    <h1 class="title">Modification d'un livre</h1>
    <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
    <FormKit type="form" submit-label="Enregistrer" :plugins="[zodPlugin]" @submit="submitHandler">
      <FormKit
        type="text"
        name="name"
        v-model="state.name"
        validation="required"
        validation-label="Le titre du livre"
        help="Entrez le titre du livre."
      />
      <FormKit
        type="textarea"
        name="description"
        v-model="state.description"
        help="Entrez la description du livre."
      />
      <FormKit
        type="select"
        name="author"
        v-model="state.author"
        validation="required"
        validation-label="L'auteur du livre"
        help="Sélectionnez l'auteur du livre."
        :options="authors.authors.map((author) => ({ value: author.id, label: author.lastName }))"
      />
      <FormKit
        type="select"
        name="edition"
        v-model="state.edition"
        validation="required"
        validation-label="L'édition du livre"
        help="Sélectionnez l'édition du livre."
        :options="editions.editions.map((edition) => ({ value: edition.id, label: edition.name }))"
      />
      <FormKit
        type="select"
        name="categories"
        v-model="state.categories"
        validation="required"
        validation-label="Les catégories du livre"
        help="Sélectionnez les catégories du livre."
        :options="
          categories.categories.map((category) => ({ value: category.id, label: category.name }))
        "
        multiple
      />
      <FormKit
        type="select"
        name="bookVariants"
        v-model="state.bookVariants"
        validation="required"
        validation-label="Les catégories du livre"
        help="Sélectionnez les variants du livre."
        :options="variants.variants.map((variant) => ({ value: variant.id, label: variant.type }))"
        multiple
      />
      <FormKit
        type="checkbox"
        name="enable"
        v-model="state.enable"
        help="Cochez cette case si le livre doit être actif."
      />
    </FormKit>
  </div>
</template>
