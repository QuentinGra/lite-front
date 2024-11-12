export interface Image {
  id: number
  imageName: string
  created_at: string
  updated_at: string
  enable: boolean
}

export interface ImageCreate {
  image: File | null
  book: number
  enable: boolean
}
