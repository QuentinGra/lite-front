export interface Category {
  id: number
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  enable: boolean
}

export interface CategoryState {
  categories: Category[]
}
