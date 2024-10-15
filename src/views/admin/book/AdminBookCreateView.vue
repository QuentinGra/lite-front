<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createZodPlugin } from '@formkit/zod'
import { bookSchema } from '@/schemas/admin/book.schema'
import { createBook } from '@/api/admin/book.api'
import { fetchAuthors } from '@/api/admin/author.api'
import { fetchEditions } from '@/api/admin/edition.api'
import { fetchCategories } from '@/api/admin/category.api'
import { fetchBookVariants } from '@/api/admin/variant.api'
import type { BookCreate } from '@/interfaces/admin/book.interface'
import type { Edition, EditionState } from '@/interfaces/admin/edition.interface'
import type { Author, AuthorState } from '@/interfaces/admin/author.interface'
import type { Category, CategoryState } from '@/interfaces/admin/category.interface'
import type { BookVariant, VariantState } from '@/interfaces/admin/variant.interface'

const router = useRouter()
const errorMessage = ref<string>('')

const editions = reactive<EditionState>({ editions: [] })
const authors = reactive<AuthorState>({ authors: [] })
const categories = reactive<CategoryState>({ categories: [] })
const variants = reactive<VariantState>({ variants: [] })

const state = reactive<BookCreate>({
  name: '',
  description: '',
  dateEdition: new Date(),
  enable: false,
  edition: 1,
  author: 1,
  categories: 1,
  bookVariants: 1
})

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
    await createBook(state)
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
  loadAuthors()
  loadEditions()
  loadCategories()
  loadVariants()
})

const [zodPlugin, submitHandler] = createZodPlugin(bookSchema, saveBook)
</script>

<template>
  <div>
    <h1 class="title">Création d'un livre</h1>
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
      <FormKit type="date" name="dateEdition" help="Entrer la date d'édition" />
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
        help="Sélectionnez les catégories du livre."
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
