export interface BookVariant {
  id: number
  type: string
  createdAt: Date
  updatedAt: Date
  enable: boolean
}

export interface VariantState {
  variants: BookVariant[]
}
