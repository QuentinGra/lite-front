interface Category {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  enable: boolean
}

interface Edition {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  enable: boolean
}

interface Author {
  id: number
  firstName: string
  lastName: string
  createdAt: Date
  updatedAt: Date
  enable: boolean
}

interface BookVariant {
  id: number
  type: string
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
  bookVariants: BookVariant[]
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
  categories: number
  bookVariants: number
}
