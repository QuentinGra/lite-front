export interface Author {
  id: number
  firstName: string
  lastName: string
  description: string
  imageName: string
  createdAt: Date
  updatedAt: Date
  enable: boolean
}

export interface AuthorCreate {
  id: number
  firstName: string
  lastName: string
  description: string
  image: File
  enable: boolean
}

export interface AuthorState {
  authors: Author[]
}
