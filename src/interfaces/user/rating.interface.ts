export interface Rating {
  id: number
  book: Book
  rating: number
  createdAt: Date
  updatedAt: Date
}

interface Book {
  name: string
  bookImages: BookImage[]
  createdAt: Date
  updatedAt: Date
  enabled: boolean
}

interface BookImage {
  imageName: string
  createdAt: Date
  updatedAt: Date
  enabled: boolean
}
