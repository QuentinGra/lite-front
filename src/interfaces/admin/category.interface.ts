import type { Book } from '@/interfaces/admin/book.interface'

export interface Category {
  id: number
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  enable: boolean
  books: Book[]
}

export interface CategoryState {
  categories: Category[]
}
