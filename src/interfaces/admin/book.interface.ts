interface Category {
  name: string
  createdAt: Date
  updatedAt: Date
  enable: boolean
}

interface Edition {
  name: string
  createdAt: Date
  updatedAt: Date
  enable: boolean
}

interface Author {
  firstName: string
  lastName: string
  createdAt: Date
  updatedAt: Date
  enable: boolean
}

export interface Book {
  id: number
  name: string
  description: string
  dateEdition: Date
  categories: Category[]
  edition: Edition
  author: Author
  bookVariants: []
  createdAt: Date
  updatedAt: Date
  enable: boolean
}

export interface BookState {
  books: Book[]
}

export interface BookCreate {
  name: string
  description: string
  dateEdition: Date
  enable: boolean
  edition: number
  author: number
  categories: number[]
  bookVariants: number[]
}
