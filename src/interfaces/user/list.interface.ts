export interface List {
  id: number
  name: string
  readingListBooks: readingListBooks[]
  createdAt: Date
  updatedAt: Date
}

interface readingListBooks {
  id: number
  book: Book
  status: string
}

interface Book {
  id: number
  name: string
  dateEdition: Date
  bookImages: bookImages[]
  createdAt: Date
  updatedAt: Date
  enabled: boolean
}

interface bookImages {
  imageName: string
  createdAt: Date
  updatedAt: Date
  enabled: boolean
}
